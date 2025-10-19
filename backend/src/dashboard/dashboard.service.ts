import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event } from '../schemas/event.schema';
import { Booking } from '../schemas/booking.schema';

@Injectable()
export class DashboardService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<Event>,
    @InjectModel(Booking.name) private bookingModel: Model<Booking>,
  ) {}

  async getOrganizerStats(organizerId: string) {
    const totalEvents = await this.eventModel.countDocuments({ organizerId: organizerId });
    const activeEvents = await this.eventModel.countDocuments({ 
      organizerId: organizerId, 
      status: 'published',
      startAt: { $gte: new Date() }
    });
    
    const totalBookings = await this.bookingModel.countDocuments({
      event: { $in: await this.eventModel.find({ organizerId: organizerId }).select('_id') }
    });
    
    const totalRevenue = await this.bookingModel.aggregate([
      {
        $lookup: {
          from: 'events',
          localField: 'event',
          foreignField: '_id',
          as: 'eventData'
        }
      },
      {
        $match: {
          'eventData.organizerId': organizerId,
          status: 'confirmed'
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$totalAmount' }
        }
      }
    ]);

    return {
      totalEvents,
      activeEvents,
      totalBookings,
      totalRevenue: totalRevenue[0]?.total || 0,
    };
  }

  async getOrganizerEvents(organizerId: string, query: any) {
    const { page = 1, limit = 10, status } = query;
    const filter: any = { organizerId: organizerId };
    
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
    
    const eventIds = await this.eventModel.find({ organizerId: organizerId }).select('_id');
    
    const bookings = await this.bookingModel
      .find({ event: { $in: eventIds } })
      .populate('event', 'title startAt venue')
      .populate('user', 'fullName email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await this.bookingModel.countDocuments({ event: { $in: eventIds } });

    return {
      bookings,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
    };
  }

  async getOrganizerPayments(organizerId: string, query: any) {
    const { page = 1, limit = 10 } = query;
    
    const eventIds = await this.eventModel.find({ organizerId: organizerId }).select('_id');
    
    const payments = await this.bookingModel
      .find({ 
        event: { $in: eventIds },
        status: 'confirmed'
      })
      .populate('event', 'title startAt')
      .populate('user', 'fullName email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await this.bookingModel.countDocuments({ 
      event: { $in: eventIds },
      status: 'confirmed'
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

    const eventIds = await this.eventModel.find({ organizerId: organizerId }).select('_id');
    
    const bookingsOverTime = await this.bookingModel.aggregate([
      {
        $match: {
          event: { $in: eventIds },
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
          event: { $in: eventIds },
          status: 'confirmed',
          createdAt: { $gte: startDate }
        }
      },
      {
        $lookup: {
          from: 'events',
          localField: 'event',
          foreignField: '_id',
          as: 'eventData'
        }
      },
      {
        $group: {
          _id: '$event',
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