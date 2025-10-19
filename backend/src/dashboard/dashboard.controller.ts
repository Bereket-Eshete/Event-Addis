import { Controller, Get, Query, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../schemas/user.schema';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @Get('organizer/stats')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ORGANIZER)
  async getOrganizerStats(@Req() req) {
    return this.dashboardService.getOrganizerStats(req.user.userId);
  }

  @Get('organizer/events')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ORGANIZER)
  async getOrganizerEvents(@Req() req, @Query() query: any) {
    return this.dashboardService.getOrganizerEvents(req.user.userId, query);
  }

  @Get('organizer/bookings')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ORGANIZER)
  async getOrganizerBookings(@Req() req, @Query() query: any) {
    return this.dashboardService.getOrganizerBookings(req.user.userId, query);
  }

  @Get('organizer/payments')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ORGANIZER)
  async getOrganizerPayments(@Req() req, @Query() query: any) {
    return this.dashboardService.getOrganizerPayments(req.user.userId, query);
  }

  @Get('organizer/analytics')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ORGANIZER)
  async getOrganizerAnalytics(@Req() req, @Query('period') period: string) {
    return this.dashboardService.getOrganizerAnalytics(req.user.userId, period);
  }
}