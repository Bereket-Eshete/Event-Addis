import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/events.module';
import { UploadsModule } from './uploads/uploads.module';
import { BookingsModule } from './bookings/bookings.module';
import { PaymentsModule } from './payments/payments.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL || '', {
      onConnectionCreate: (connection) => {
        console.log('✅ Successfully connected to MongoDB Atlas!');
        console.log(
          `📊 Database: ${connection.db?.databaseName || 'event-addis'}`,
        );
        return connection;
      },
    }),
    AuthModule,
    EventsModule,
    UploadsModule,
    BookingsModule,
    PaymentsModule,
    DashboardModule,
    NotificationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
