import { Controller, Post, Body, Query } from '@nestjs/common';
import { BookingsService } from '../bookings/bookings.service';

@Controller('api/payments')
export class PaymentsController {
  constructor(private readonly bookingsService: BookingsService) {}
  // chapa callback
  @Post('chapa/callback')
  async chapaCallback(
    @Query('trx_ref') txRef: string,
    @Query('status') status: string,
    @Body() body: any,
  ) {
    // Handle Chapa webhook callback
    return this.bookingsService.handleChapaCallback(txRef, status);
  }
}
