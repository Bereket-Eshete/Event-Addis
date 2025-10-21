import { Controller, Get, Post, Put, Body, Param, Query, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  async getNotifications(
    @Req() req: any,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '20'
  ) {
    return this.notificationsService.getUserNotifications(
      req.user.userId,
      parseInt(page),
      parseInt(limit)
    );
  }

  @Put(':id/read')
  async markAsRead(@Param('id') id: string, @Req() req: any) {
    return this.notificationsService.markAsRead(id, req.user.userId);
  }

  @Put('mark-all-read')
  async markAllAsRead(@Req() req: any) {
    return this.notificationsService.markAllAsRead(req.user.userId);
  }

  @Post('announcement')
  async sendAnnouncement(
    @Body() body: { eventId: string; title: string; message: string },
    @Req() req: any
  ) {
    return this.notificationsService.sendAnnouncement(
      body.eventId,
      req.user.userId,
      body.title,
      body.message
    );
  }

  @Post('message')
  async sendMessage(
    @Body() body: { recipientId: string; eventId: string; message: string },
    @Req() req: any
  ) {
    return this.notificationsService.sendMessage(
      body.recipientId,
      req.user.userId,
      body.eventId,
      body.message
    );
  }
}