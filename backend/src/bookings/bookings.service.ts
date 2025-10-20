import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChapaService } from 'chapa-nestjs';
import { v4 as uuidv4 } from 'uuid';
import {
  Booking,
  BookingStatus,
  PaymentProvider,
} from '../schemas/booking.schema';
import { Event } from '../schemas/event.schema';
import { User } from '../schemas/user.schema';
import { CreateBookingDto } from './dto/create-booking.dto';
import { EmailService } from '../auth/email.service';

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<Booking>,
    @InjectModel(Event.name) private eventModel: Model<Event>,
    @InjectModel(User.name) private userModel: Model<User>,
    private chapaService: ChapaService,
    private emailService: EmailService,
  ) {}

  async createBooking(
    eventId: string,
    createBookingDto: CreateBookingDto,
    userId: string,
  ) {
    const event = await this.eventModel.findById(eventId);
    if (!event) {
      throw new NotFoundException('Event not found');
    }

    if (event.status !== 'published') {
      throw new BadRequestException('Event is not available for booking');
    }

    if (new Date() > event.registrationDeadline) {
      throw new BadRequestException('Registration deadline has passed');
    }

    // Check capacity
    const existingBookings = await this.bookingModel.aggregate([
      { $match: { eventId: event._id, status: BookingStatus.CONFIRMED } },
      { $group: { _id: null, totalQuantity: { $sum: '$quantity' } } },
    ]);

    const bookedQuantity = existingBookings[0]?.totalQuantity || 0;
    const availableCapacity = event.capacity - bookedQuantity;

    if (createBookingDto.quantity > availableCapacity) {
      throw new BadRequestException(
        `Only ${availableCapacity} spots available`,
      );
    }

    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check if user already has a booking for this event
    const existingBooking = await this.bookingModel.findOne({
      userId,
      eventId,
      status: { $in: [BookingStatus.CONFIRMED, BookingStatus.PENDING_PAYMENT] },
    });

    if (existingBooking) {
      throw new BadRequestException(
        'You already have a booking for this event',
      );
    }

    const totalAmount = event.price * createBookingDto.quantity;

    // Create booking
    const booking = new this.bookingModel({
      userId,
      eventId,
      quantity: createBookingDto.quantity,
      totalAmount,
      paymentInfo: {
        provider:
          event.price > 0 ? PaymentProvider.CHAPA : PaymentProvider.NONE,
        amount: totalAmount,
        currency: 'ETB',
      },
    });

    if (event.price === 0) {
      // Free event - confirm immediately
      booking.status = BookingStatus.CONFIRMED;
      await booking.save();

      // Update event registered count
      await this.eventModel.findByIdAndUpdate(eventId, {
        $inc: { registeredCount: booking.quantity },
      });

      // Send confirmation email
      await this.sendBookingConfirmationEmail(user, event, booking);

      return { booking, message: 'Booking confirmed successfully' };
    } else {
      // Paid event - initialize Chapa payment
      const txRef = uuidv4();
      booking.paymentInfo.reference = txRef;

      try {
        const checkoutUrl = await this.initializeChapaPayment(
          booking,
          user,
          event,
          txRef,
        );
        booking.paymentInfo.checkoutUrl = checkoutUrl;
        await booking.save();

        return {
          booking,
          checkoutUrl,
          message: 'Please complete payment to confirm booking',
        };
      } catch (error) {
        console.error('Chapa payment initialization error:', error);
        throw new BadRequestException(`Failed to initialize payment: ${error.message}`);
      }
    }
  }

  private async initializeChapaPayment(
    booking: Booking,
    user: User,
    event: Event,
    txRef: string,
  ) {
    console.log('Initializing Chapa payment with:', {
      amount: booking.paymentInfo.amount,
      txRef,
      userEmail: user.email
    });
    
    const response = await this.chapaService.initialize({
      first_name: user.fullName.split(' ')[0],
      last_name: user.fullName.split(' ').slice(1).join(' ') || 'User',
      email: user.email,
      currency: 'ETB',
      amount: booking.paymentInfo.amount.toString(),
      tx_ref: txRef,
      return_url: `https://6a03dc12f633.ngrok-free.app/booking-result?trx_ref=${txRef}&status=success`,
      customization: {
        title: 'EventAddis',
        description: `Payment for ${event.title}`,
      },
    });

    console.log('Chapa response:', response);
    return response.data.checkout_url;
  }

  async handleChapaCallback(txRef: string, status: string) {
    console.log('Chapa callback received:', { txRef, status });
    
    const booking = await this.bookingModel
      .findOne({ 'paymentInfo.reference': txRef })
      .populate('userId')
      .populate('eventId');

    if (!booking) {
      console.log('Booking not found for txRef:', txRef);
      throw new NotFoundException('Booking not found');
    }

    console.log('Found booking:', booking._id, 'current status:', booking.status);

    if (status === 'success') {
      // Verify payment with Chapa
      try {
        const verification = await this.chapaService.verify({ tx_ref: txRef });
        console.log('Chapa verification result:', verification.data.status);

        if (verification.data.status === 'success') {
          booking.status = BookingStatus.CONFIRMED;
          booking.paymentInfo.transactionId = verification.data.reference;
          await booking.save();
          console.log('Booking confirmed and saved');

          // Update event registered count
          await this.eventModel.findByIdAndUpdate(booking.eventId, {
            $inc: { registeredCount: booking.quantity },
          });
          console.log('Event registered count updated');

          // Send confirmation email
          await this.sendBookingConfirmationEmail(
            booking.userId as any,
            booking.eventId as any,
            booking,
          );

          return { message: 'Payment confirmed successfully' };
        }
      } catch (error) {
        console.error('Payment verification failed:', error);
        booking.status = BookingStatus.PAYMENT_FAILED;
        await booking.save();
        throw new BadRequestException('Payment verification failed');
      }
    } else {
      booking.status = BookingStatus.PAYMENT_FAILED;
      await booking.save();

      // Send payment failed email
      await this.sendPaymentFailedEmail(
        booking.userId as any,
        booking.eventId as any,
      );
    }

    return { message: 'Payment status updated' };
  }

  async verifyAndConfirmPayment(txRef: string) {
    try {
      const verification = await this.chapaService.verify({ tx_ref: txRef });
      
      if (verification.data.status === 'success') {
        return await this.handleChapaCallback(txRef, 'success');
      } else {
        return await this.handleChapaCallback(txRef, 'failed');
      }
    } catch (error) {
      console.error('Manual verification failed:', error);
      throw new BadRequestException('Payment verification failed');
    }
  }

  async getUserBookings(userId: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [bookings, total] = await Promise.all([
      this.bookingModel
        .find({ userId })
        .populate('eventId', 'title startAt endAt venue bannerUrl price')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec(),
      this.bookingModel.countDocuments({ userId }),
    ]);

    return {
      bookings,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async getEventBookings(
    eventId: string,
    organizerId: string,
    page = 1,
    limit = 10,
  ) {
    // Verify organizer owns the event
    const event = await this.eventModel.findById(eventId);
    if (!event || event.organizerId.toString() !== organizerId) {
      throw new BadRequestException(
        'You can only view bookings for your own events',
      );
    }

    const skip = (page - 1) * limit;

    const [bookings, total] = await Promise.all([
      this.bookingModel
        .find({ eventId, status: BookingStatus.CONFIRMED })
        .populate('userId', 'fullName email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec(),
      this.bookingModel.countDocuments({
        eventId,
        status: BookingStatus.CONFIRMED,
      }),
    ]);

    return {
      bookings,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  private async sendBookingConfirmationEmail(
    user: any,
    event: any,
    booking: Booking,
  ) {
    const subject = 'Booking Confirmed - EventAddis';
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Booking Confirmed!</h2>
        <p>Hi ${user.fullName},</p>
        <p>Your booking for <strong>${event.title}</strong> has been confirmed.</p>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3>Event Details:</h3>
          <p><strong>Event:</strong> ${event.title}</p>
          <p><strong>Date:</strong> ${new Date(event.startAt).toLocaleDateString()}</p>
          <p><strong>Time:</strong> ${new Date(event.startAt).toLocaleTimeString()}</p>
          <p><strong>Venue:</strong> ${event.venue}</p>
          <p><strong>Quantity:</strong> ${booking.quantity}</p>
          ${booking.paymentInfo.amount > 0 ? `<p><strong>Amount Paid:</strong> ${booking.paymentInfo.amount} ETB</p>` : ''}
        </div>
        <p>We look forward to seeing you at the event!</p>
        <p>Best regards,<br>EventAddis Team</p>
      </div>
    `;

    await this.emailService.sendEmail(user.email, subject, html);
  }

  private async sendPaymentFailedEmail(user: any, event: any) {
    const subject = 'Payment Failed - EventAddis';
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #dc3545;">Payment Failed</h2>
        <p>Hi ${user.fullName},</p>
        <p>Unfortunately, your payment for <strong>${event.title}</strong> could not be processed.</p>
        <p>Please try booking again or contact our support team if you continue to experience issues.</p>
        <p>Best regards,<br>EventAddis Team</p>
      </div>
    `;

    await this.emailService.sendEmail(user.email, subject, html);
  }

  async getEventBookingStats(eventId: string, organizerId: string) {
    // Verify organizer owns the event
    const event = await this.eventModel.findById(eventId);
    if (!event || event.organizerId.toString() !== organizerId) {
      throw new BadRequestException(
        'You can only view stats for your own events',
      );
    }

    const stats = await this.bookingModel.aggregate([
      { $match: { eventId: event._id } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalQuantity: { $sum: '$quantity' },
          totalRevenue: { $sum: '$paymentInfo.amount' },
        },
      },
    ]);

    const confirmedBookings = stats.find(
      (s) => s._id === BookingStatus.CONFIRMED,
    ) || { count: 0, totalQuantity: 0, totalRevenue: 0 };
    const pendingBookings = stats.find(
      (s) => s._id === BookingStatus.PENDING_PAYMENT,
    ) || { count: 0, totalQuantity: 0, totalRevenue: 0 };
    const failedBookings = stats.find(
      (s) => s._id === BookingStatus.PAYMENT_FAILED,
    ) || { count: 0, totalQuantity: 0, totalRevenue: 0 };

    return {
      event: {
        title: event.title,
        capacity: event.capacity,
        price: event.price,
      },
      bookings: {
        confirmed: confirmedBookings,
        pending: pendingBookings,
        failed: failedBookings,
        availableSpots: event.capacity - confirmedBookings.totalQuantity,
      },
    };
  }
}
