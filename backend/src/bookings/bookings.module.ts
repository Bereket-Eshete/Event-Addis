import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChapaModule } from 'chapa-nestjs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { Booking, BookingSchema } from '../schemas/booking.schema';
import { Event, EventSchema } from '../schemas/event.schema';
import { User, UserSchema } from '../schemas/user.schema';
import { EmailService } from '../auth/email.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Booking.name, schema: BookingSchema },
      { name: Event.name, schema: EventSchema },
      { name: User.name, schema: UserSchema },
    ]),
    ChapaModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secretKey: configService.get('CHAPA_SECRET_KEY') || 'fallback-key',
      }),
    }),
  ],
  controllers: [BookingsController],
  providers: [BookingsService, EmailService],
  exports: [BookingsService],
})
export class BookingsModule {}