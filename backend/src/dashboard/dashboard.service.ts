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
    console.log('Getting organizer stats for:', organizerId);
    
    // Try both string and ObjectId formats
    const totalEventsString = await this.eventModel.countDocuments({ organizerId: organizerId });
    const totalEventsObjectId = await this.eventModel.countDocuments({ organizerId: new Types.ObjectId(organizerId) });
    console.log('Total events (string):', totalEventsString, 'Total events (ObjectId):', totalEventsObjectId);
    
    const totalEvents = Math.max(totalEventsString, totalEventsObjectId);
    const organizerQuery = totalEventsString > 0 ? organizerId : new Types.ObjectId(organizerId);
    
    const activeEvents = await this.eventModel.countDocuments({ 
      organizerId: organizerQuery, 
      status: 'published',
      startAt: { $gte: new Date() }
    });
    console.log('Active events found:', activeEvents);
    
    const eventIds = await this.eventModel.find({ organizerId: organizerQuery }).select('_id');
    console.log('Event IDs found:', eventIds.map(e => e._id));
    const eventIdArray = eventIds.map(event => event._id);
    const eventIdStringArray = eventIds.map(event => (event._id as Types.ObjectId).toString());
    
    const totalBookings = await this.bookingModel.countDocuments({
      $or: [
        { eventId: { $in: eventIdArray } },
        { eventId: { $in: eventIdStringArray } }
      ]
    });
    console.log('Total bookings found:', totalBookings);
    
    const totalRevenue = await this.bookingModel.aggregate([
      {
        $match: {
          $or: [
            { eventId: { $in: eventIdArray } },
            { eventId: { $in: eventIdStringArray } }
          ],
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
    console.log('Total revenue aggregate result:', totalRevenue);
    const revenueAmount = totalRevenue.length > 0 ? (totalRevenue[0]?.total || 0) : 0;
    console.log('Final revenue amount:', revenueAmount);

    return {
      totalEvents,
      activeEvents,
      totalBookings,
      totalRevenue: revenueAmount,
    };
  }

  async getOrganizerEvents(organizerId: string, query: any) {
    const { page = 1, limit = 10, status } = query;
    
    // Use the same organizerId format as determined in getOrganizerStats
    const totalEventsString = await this.eventModel.countDocuments({ organizerId: organizerId });
    const organizerQuery = totalEventsString > 0 ? organizerId : new Types.ObjectId(organizerId);
    
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
    
    // Use the same organizerId format as determined in getOrganizerStats
    const totalEventsString = await this.eventModel.countDocuments({ organizerId: organizerId });
    const organizerQuery = totalEventsString > 0 ? organizerId : new Types.ObjectId(organizerId);
    
    const eventIds = await this.eventModel.find({ organizerId: organizerQuery }).select('_id');
    const eventIdArray = eventIds.map(event => event._id);
    const eventIdStringArray = eventIds.map(event => (event._id as Types.ObjectId).toString());
    
    const bookings = await this.bookingModel
      .find({ 
        $or: [
          { eventId: { $in: eventIdArray } },
          { eventId: { $in: eventIdStringArray } }
        ]
      })
      .populate('eventId', 'title startAt venue')
      .populate('userId', 'fullName email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await this.bookingModel.countDocuments({ 
      $or: [
        { eventId: { $in: eventIdArray } },
        { eventId: { $in: eventIdStringArray } }
      ]
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
    
    // Use the same organizerId format as determined in getOrganizerStats
    const totalEventsString = await this.eventModel.countDocuments({ organizerId: organizerId });
    const organizerQuery = totalEventsString > 0 ? organizerId : new Types.ObjectId(organizerId);
    
    const eventIds = await this.eventModel.find({ organizerId: organizerQuery }).select('_id');
    const eventIdArray = eventIds.map(event => event._id);
    const eventIdStringArray = eventIds.map(event => (event._id as Types.ObjectId).toString());
    
    const payments = await this.bookingModel
      .find({ 
        $or: [
          { eventId: { $in: eventIdArray } },
          { eventId: { $in: eventIdStringArray } }
        ],
        status: BookingStatus.CONFIRMED
      })
      .populate('eventId', 'title startAt')
      .populate('userId', 'fullName email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await this.bookingModel.countDocuments({ 
      $or: [
        { eventId: { $in: eventIdArray } },
        { eventId: { $in: eventIdStringArray } }
      ],
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

    // Use the same organizerId format as determined in getOrganizerStats
    const totalEventsString = await this.eventModel.countDocuments({ organizerId: organizerId });
    const organizerQuery = totalEventsString > 0 ? organizerId : new Types.ObjectId(organizerId);

    const eventIds = await this.eventModel.find({ organizerId: organizerQuery }).select('_id');
    const eventIdArray = eventIds.map(event => event._id);
    const eventIdStringArray = eventIds.map(event => (event._id as Types.ObjectId).toString());
    
    const bookingsOverTime = await this.bookingModel.aggregate([
      {
        $match: {
          $or: [
            { eventId: { $in: eventIdArray } },
            { eventId: { $in: eventIdStringArray } }
          ],
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
          $or: [
            { eventId: { $in: eventIdArray } },
            { eventId: { $in: eventIdStringArray } }
          ],
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