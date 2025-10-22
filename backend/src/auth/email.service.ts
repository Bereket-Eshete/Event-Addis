import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  constructor(private configService: ConfigService) {
    console.log('📧 Email service initialized (disabled)');
  }

  async sendVerificationEmail(email: string, token: string) {
    console.log('📧 Email verification disabled');
    return { success: true };
  }

  async sendPasswordResetEmail(email: string, token: string) {
    console.log('📧 Password reset email disabled');
    return { success: true };
  }

  async sendEmail(to: string, subject: string, html: string) {
    console.log('📧 Email sending disabled');
    return { success: true };
  }
}