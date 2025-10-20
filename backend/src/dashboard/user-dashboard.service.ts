import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event } from '../schemas/event.schema';
import { Booking } from '../schemas/booking.schema';
import { User } from '../schemas/user.schema';
import { Message } from '../schemas/message.schema';

@Injectable()
export class UserDashboardService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<Event>,
    @InjectModel(Booking.name) private bookingModel: Model<Booking>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Message.name) private messageModel: Model<Message>,
  ) {}

  async getUserStats(userId: string) {
    const totalBookings = await this.bookingModel.countDocuments({ user: userId });
    const upcomingEvents = await this.bookingModel.countDocuments({
      user: userId,
      'event.startAt': { $gte: new Date() }
    });
    
    const totalSpent = await this.bookingModel.aggregate([
      { $match: { user: userId, status: 'confirmed' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);

    const favoriteEvents = await this.userModel.findById(userId).select('favoriteEvents');

    return {
      totalBookings,
      upcomingEvents,
      totalSpent: totalSpent[0]?.total || 0,
      favoriteEvents: favoriteEvents?.favoriteEvents?.length || 0,
    };
  }

  async getUserBookings(userId: string, query: any) {
    const { page = 1, limit = 10 } = query;
    
    const bookings = await this.bookingModel
      .find({ user: userId })
      .populate('event', 'title startAt venue price category')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await this.bookingModel.countDocuments({ user: userId });

    return {
      bookings,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
    };
  }

  async getUserPayments(userId: string, query: any) {
    const { page = 1, limit = 10 } = query;
    
    const payments = await this.bookingModel
      .find({ user: userId, status: 'confirmed' })
      .populate('event', 'title startAt')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await this.bookingModel.countDocuments({ user: userId, status: 'confirmed' });

    return {
      payments,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
    };
  }

  async getUserFavorites(userId: string, query: any) {
    const { page = 1, limit = 10 } = query;
    
    const user = await this.userModel.findById(userId).populate({
      path: 'favoriteEvents',
      options: {
        limit: limit * 1,
        skip: (page - 1) * limit,
        sort: { createdAt: -1 }
      }
    });

    const totalFavorites = user?.favoriteEvents?.length || 0;

    return {
      favorites: user?.favoriteEvents || [],
      total: totalFavorites,
      page: parseInt(page),
      pages: Math.ceil(totalFavorites / limit),
    };
  }

  async addToFavorites(userId: string, eventId: string) {
    await this.userModel.findByIdAndUpdate(
      userId,
      { $addToSet: { favoriteEvents: eventId } }
    );
    return { message: 'Event added to favorites' };
  }

  async removeFromFavorites(userId: string, eventId: string) {
    await this.userModel.findByIdAndUpdate(
      userId,
      { $pull: { favoriteEvents: eventId } }
    );
    return { message: 'Event removed from favorites' };
  }

  async getUserMessages(userId: string, query: any) {
    const { page = 1, limit = 10 } = query;
    
    const messages = await this.messageModel
      .find({ recipient: userId })
      .populate('sender', 'fullName')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await this.messageModel.countDocuments({ recipient: userId });
    const unreadCount = await this.messageModel.countDocuments({ recipient: userId, read: false });

    return {
      messages,
      total,
      unreadCount,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
    };
  }

  async markMessageAsRead(userId: string, messageId: string) {
    await this.messageModel.findOneAndUpdate(
      { _id: messageId, recipient: userId },
      { read: true }
    );
    return { message: 'Message marked as read' };
  }
}