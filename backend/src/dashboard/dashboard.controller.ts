import { Controller, Get, Post, Delete, Query, Body, Param, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../schemas/user.schema';
import { DashboardService } from './dashboard.service';
import { UserDashboardService } from './user-dashboard.service';

@Controller('dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(
    private dashboardService: DashboardService,
    private userDashboardService: UserDashboardService,
  ) {}

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

  // User dashboard endpoints
  @Get('user/stats')
  async getUserStats(@Req() req) {
    return this.userDashboardService.getUserStats(req.user.userId);
  }

  @Get('user/bookings')
  async getUserBookings(@Req() req, @Query() query) {
    return this.userDashboardService.getUserBookings(req.user.userId, query);
  }

  @Get('user/payments')
  async getUserPayments(@Req() req, @Query() query) {
    return this.userDashboardService.getUserPayments(req.user.userId, query);
  }

  @Get('user/favorites')
  async getUserFavorites(@Req() req, @Query() query) {
    return this.userDashboardService.getUserFavorites(req.user.userId, query);
  }

  @Post('user/favorites')
  async addToFavorites(@Req() req, @Body('eventId') eventId: string) {
    return this.userDashboardService.addToFavorites(req.user.userId, eventId);
  }

  @Delete('user/favorites/:eventId')
  async removeFromFavorites(@Req() req, @Param('eventId') eventId: string) {
    return this.userDashboardService.removeFromFavorites(req.user.userId, eventId);
  }

  @Get('user/messages')
  async getUserMessages(@Req() req, @Query() query) {
    return this.userDashboardService.getUserMessages(req.user.userId, query);
  }

  @Post('user/messages/:messageId/read')
  async markMessageAsRead(@Req() req, @Param('messageId') messageId: string) {
    return this.userDashboardService.markMessageAsRead(req.user.userId, messageId);
  }
}