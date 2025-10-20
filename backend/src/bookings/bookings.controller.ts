import { Controller, Post, Get, Body, Param, Query, UseGuards, Req } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../schemas/user.schema';

@Controller('api')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post('events/:id/book')
  @UseGuards(JwtAuthGuard)
  createBooking(
    @Param('id') eventId: string,
    @Body() createBookingDto: CreateBookingDto,
    @Req() req
  ) {
    return this.bookingsService.createBooking(eventId, createBookingDto, req.user.userId);
  }

  @Get('bookings/user')
  @UseGuards(JwtAuthGuard)
  getUserBookings(
    @Req() req,
    @Query('page') page?: number,
    @Query('limit') limit?: number
  ) {
    return this.bookingsService.getUserBookings(req.user.userId, page, limit);
  }

  @Get('events/:id/bookings')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ORGANIZER, UserRole.ADMIN)
  getEventBookings(
    @Param('id') eventId: string,
    @Req() req,
    @Query('page') page?: number,
    @Query('limit') limit?: number
  ) {
    return this.bookingsService.getEventBookings(eventId, req.user.userId, page, limit);
  }

  @Get('events/:id/stats')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ORGANIZER, UserRole.ADMIN)
  getEventBookingStats(@Param('id') eventId: string, @Req() req) {
    return this.bookingsService.getEventBookingStats(eventId, req.user.userId);
  }

  @Post('chapa/callback')
  handleChapaCallback(@Body() body: any) {
    const { tx_ref, status } = body;
    return this.bookingsService.handleChapaCallback(tx_ref, status);
  }

  @Post('verify-payment/:txRef')
  @UseGuards(JwtAuthGuard)
  verifyPayment(@Param('txRef') txRef: string) {
    return this.bookingsService.verifyAndConfirmPayment(txRef);
  }
}