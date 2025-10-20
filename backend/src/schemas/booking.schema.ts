import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum BookingStatus {
  PENDING_PAYMENT = 'pending_payment',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  PAYMENT_FAILED = 'payment_failed',
}

export enum PaymentProvider {
  CHAPA = 'chapa',
  NONE = 'none',
}

@Schema()
export class PaymentInfo {
  @Prop({ enum: PaymentProvider, default: PaymentProvider.NONE })
  provider: PaymentProvider;

  @Prop({ default: 0 })
  amount: number;

  @Prop({ default: 'ETB' })
  currency: string;

  @Prop()
  reference?: string;

  @Prop()
  transactionId?: string;

  @Prop()
  checkoutUrl?: string;
}

@Schema({ timestamps: true })
export class Booking extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Event', required: true })
  eventId: Types.ObjectId;

  @Prop({ required: true, min: 1 })
  quantity: number;

  @Prop({ enum: BookingStatus, default: BookingStatus.PENDING_PAYMENT })
  status: BookingStatus;

  @Prop({ type: PaymentInfo })
  paymentInfo: PaymentInfo;

  @Prop({ default: 0 })
  totalAmount: number;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);