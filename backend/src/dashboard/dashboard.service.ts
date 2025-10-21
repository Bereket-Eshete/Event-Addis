import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Event } from '../schemas/event.schema';
import { Booking, BookingStatus } from '../schemas/booking.schema';

@Injectable()
export class DashboardService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<Event>,
    @InjectModel(Booking.name) private bookingModel: Model<Booking>,
  ) {}

  async getOrganizerStats(organizerId: string) {
    // Convert to ObjectId for consistent querying
    const organizerQuery = new Types.ObjectId(organizerId);
    
    const totalEvents = await this.eventModel.countDocuments({ organizerId: organizerQuery });
    
    const activeEvents = await this.eventModel.countDocuments({ 
      organizerId: organizerQuery, 
      status: 'published',
      startAt: { $gte: new Date() }
    });

    
    const eventIds = await this.eventModel.find({ organizerId: organizerQuery }).select('_id');
    const eventIdArray = eventIds.map(event => event._id);
    
    const totalBookings = await this.bookingModel.countDocuments({
      eventId: { $in: eventIdArray }
    });

    const totalRevenue = await this.bookingModel.aggregate([
      {
        $match: {
          eventId: { $in: eventIdArray },
          status: BookingStatus.CONFIRMED
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$totalAmount' }
        }
      }
    ]);
    const revenueAmount = totalRevenue.length > 0 ? (totalRevenue[0]?.total || 0) : 0;

    return {
      totalEvents,
      activeEvents,
      totalBookings,
      totalRevenue: revenueAmount,
    };
  }

  async getOrganizerEvents(organizerId: string, query: any) {
    const { page = 1, limit = 10, status } = query;
    
    // Convert to ObjectId for consistent querying
    const organizerQuery = new Types.ObjectId(organizerId);
    
    const filter: any = { organizerId: organizerQuery };
    
    if (status) {
      filter.status = status;
    }

    const events = await this.eventModel
      .find(filter)
      .populate('organizerId', 'fullName email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await this.eventModel.countDocuments(filter);

    return {
      events,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
    };
  }

  async getOrganizerBookings(organizerId: string, query: any) {
    const { page = 1, limit = 10 } = query;
    
    // Convert to ObjectId for consistent querying
    const organizerQuery = new Types.ObjectId(organizerId);
    
    const eventIds = await this.eventModel.find({ organizerId: organizerQuery }).select('_id');
    const eventIdArray = eventIds.map(event => event._id);
    
    const bookings = await this.bookingModel
      .find({ eventId: { $in: eventIdArray } })
      .populate('eventId', 'title startAt venue')
      .populate('userId', 'fullName email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await this.bookingModel.countDocuments({ 
      eventId: { $in: eventIdArray }
    });

    return {
      bookings,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
    };
  }

  async getOrganizerPayments(organizerId: string, query: any) {
    const { page = 1, limit = 10 } = query;
    
    // Convert to ObjectId for consistent querying
    const organizerQuery = new Types.ObjectId(organizerId);
    
    const eventIds = await this.eventModel.find({ organizerId: organizerQuery }).select('_id');
    const eventIdArray = eventIds.map(event => event._id);
    
    const payments = await this.bookingModel
      .find({ 
        eventId: { $in: eventIdArray },
        status: BookingStatus.CONFIRMED
      })
      .populate('eventId', 'title startAt')
      .populate('userId', 'fullName email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await this.bookingModel.countDocuments({ 
      eventId: { $in: eventIdArray },
      status: BookingStatus.CONFIRMED
    });

    return {
      payments,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
    };
  }

  async getOrganizerAnalytics(organizerId: string, period: string) {
    const days = period === '7d' ? 7 : period === '30d' ? 30 : 90;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Convert to ObjectId for consistent querying
    const organizerQuery = new Types.ObjectId(organizerId);

    const eventIds = await this.eventModel.find({ organizerId: organizerQuery }).select('_id');
    const eventIdArray = eventIds.map(event => event._id);
    
    const bookingsOverTime = await this.bookingModel.aggregate([
      {
        $match: {
          eventId: { $in: eventIdArray },
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
          },
          count: { $sum: 1 },
          revenue: { $sum: '$totalAmount' }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    const revenueByEvent = await this.bookingModel.aggregate([
      {
        $match: {
          eventId: { $in: eventIdArray },
          status: BookingStatus.CONFIRMED,
          createdAt: { $gte: startDate }
        }
      },
      {
        $lookup: {
          from: 'events',
          localField: 'eventId',
          foreignField: '_id',
          as: 'eventData'
        }
      },
      {
        $group: {
          _id: '$eventId',
          eventTitle: { $first: '$eventData.title' },
          revenue: { $sum: '$totalAmount' },
          bookings: { $sum: 1 }
        }
      },
      { $sort: { revenue: -1 } },
      { $limit: 5 }
    ]);

    return {
      bookingsOverTime,
      revenueByEvent,
      period,
    };
  }
}