import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum NotificationType {
  ANNOUNCEMENT = 'announcement',
  MESSAGE = 'message',
  SYSTEM = 'system'
}

@Schema({ timestamps: true })
export class Notification extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  recipientId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  senderId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Event' })
  eventId: Types.ObjectId;

  @Prop({ required: true, enum: NotificationType })
  type: NotificationType;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  message: string;

  @Prop({ default: false })
  isRead: boolean;

  @Prop()
  actionUrl: string;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);