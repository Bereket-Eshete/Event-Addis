import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Notification, NotificationType } from '../schemas/notification.schema';
import { Event } from '../schemas/event.schema';
import { Booking } from '../schemas/booking.schema';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notification.name) private notificationModel: Model<Notification>,
    @InjectModel(Event.name) private eventModel: Model<Event>,
    @InjectModel(Booking.name) private bookingModel: Model<Booking>,
  ) {}

  async getUserNotifications(userId: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    
    const notifications = await this.notificationModel
      .find({ recipientId: new Types.ObjectId(userId) })
      .populate('senderId', 'fullName')
      .populate('eventId', 'title')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await this.notificationModel.countDocuments({ 
      recipientId: new Types.ObjectId(userId) 
    });

    const unreadCount = await this.notificationModel.countDocuments({ 
      recipientId: new Types.ObjectId(userId),
      isRead: false 
    });

    return {
      notifications,
      total,
      unreadCount,
      page,
      pages: Math.ceil(total / limit),
    };
  }

  async markAsRead(notificationId: string, userId: string) {
    return this.notificationModel.findOneAndUpdate(
      { _id: notificationId, recipientId: new Types.ObjectId(userId) },
      { isRead: true },
      { new: true }
    );
  }

  async markAllAsRead(userId: string) {
    return this.notificationModel.updateMany(
      { recipientId: new Types.ObjectId(userId), isRead: false },
      { isRead: true }
    );
  }

  async sendAnnouncement(eventId: string, organizerId: string, title: string, message: string) {
    // Get all users who booked this event
    const bookings = await this.bookingModel
      .find({ eventId: new Types.ObjectId(eventId) })
      .select('userId');

    const notifications = bookings.map(booking => ({
      recipientId: booking.userId,
      senderId: new Types.ObjectId(organizerId),
      eventId: new Types.ObjectId(eventId),
      type: NotificationType.ANNOUNCEMENT,
      title,
      message,
      actionUrl: `/user/events/${eventId}`
    }));

    if (notifications.length > 0) {
      await this.notificationModel.insertMany(notifications);
    }

    return { sent: notifications.length };
  }

  async sendMessage(recipientId: string, senderId: string, eventId: string, message: string) {
    const notification = new this.notificationModel({
      recipientId: new Types.ObjectId(recipientId),
      senderId: new Types.ObjectId(senderId),
      eventId: new Types.ObjectId(eventId),
      type: NotificationType.MESSAGE,
      title: 'New Message',
      message,
      actionUrl: `/dashboard/messages`
    });

    return notification.save();
  }

  async sendSystemNotification(userId: string, title: string, message: string, actionUrl?: string) {
    const notification = new this.notificationModel({
      recipientId: new Types.ObjectId(userId),
      type: NotificationType.SYSTEM,
      title,
      message,
      actionUrl
    });

    return notification.save();
  }
}