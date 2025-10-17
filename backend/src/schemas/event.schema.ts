import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum EventCategory {
  CONFERENCE = 'conference',
  WORKSHOP = 'workshop',
  SEMINAR = 'seminar',
  NETWORKING = 'networking',
  ENTERTAINMENT = 'entertainment',
  SPORTS = 'sports',
  CULTURAL = 'cultural',
  BUSINESS = 'business',
  EDUCATION = 'education',
  TECHNOLOGY = 'technology',
  OTHER = 'other',
}

export enum EventType {
  ONLINE = 'online',
  OFFLINE = 'offline',
  HYBRID = 'hybrid',
}

export enum EventStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
}

@Schema()
export class Location {
  @Prop()
  lat?: number;

  @Prop()
  lng?: number;

  @Prop({ required: true })
  address: string;
}

@Schema({ timestamps: true })
export class Event extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ enum: EventCategory, required: true })
  category: EventCategory;

  @Prop({ enum: EventType, required: true })
  type: EventType;

  @Prop({ required: true })
  venue: string;

  @Prop()
  venueDetails?: string;

  @Prop({ type: Location })
  location?: Location;

  @Prop({ required: true })
  startAt: Date;

  @Prop({ required: true })
  endAt: Date;

  @Prop()
  bannerUrl?: string;

  @Prop({ required: true, min: 1 })
  capacity: number;

  @Prop({ required: true, min: 0 })
  price: number;

  @Prop({ required: true })
  registrationDeadline: Date;

  @Prop({ enum: EventStatus, default: EventStatus.DRAFT })
  status: EventStatus;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  organizerId: Types.ObjectId;

  @Prop({ default: 0 })
  registeredCount: number;

  @Prop([String])
  tags?: string[];
}

export const EventSchema = SchemaFactory.createForClass(Event);