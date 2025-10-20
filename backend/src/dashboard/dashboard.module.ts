import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { UserDashboardService } from './user-dashboard.service';
import { Event, EventSchema } from '../schemas/event.schema';
import { Booking, BookingSchema } from '../schemas/booking.schema';
import { User, UserSchema } from '../schemas/user.schema';
import { Message, MessageSchema } from '../schemas/message.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Event.name, schema: EventSchema },
      { name: Booking.name, schema: BookingSchema },
      { name: User.name, schema: UserSchema },
      { name: Message.name, schema: MessageSchema },
    ]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService, UserDashboardService],
  exports: [DashboardService],
})
export class DashboardModule {}