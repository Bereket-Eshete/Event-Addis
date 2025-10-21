import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  constructor(private configService: ConfigService) {
    console.log('📧 Initializing email service with Web3Forms');
  }

  private async sendWeb3FormsEmail(
    to: string,
    subject: string,
    html: string
  ) {
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: 'c8f2e4d6-1a3b-4c5e-9f8a-2b4c6d8e0f1a',
          email: to,
          subject: subject,
          message: html,
          from_name: 'EventAddis Team',
          replyto: 'noreply@eventaddis.com',
        }),
      });
      
      const result = await response.json();
      if (result.success) {
        console.log('✅ Email sent successfully to:', to);
        return { success: true };
      }
      throw new Error(result.message || 'Email send failed');
    } catch (error) {
      console.error('❌ Email send failed:', error.message);
      throw error;
    }
  }

  async sendVerificationEmail(email: string, token: string) {
    const verificationUrl = `${this.configService.get('FRONTEND_URL')}/verify-email?token=${token}`;
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Welcome to EventAddis!!</h2>
        <p>Thank you for registering with EventAddis. Please verify your email address by clicking the button below:</p>
        <a href="${verificationUrl}" style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; margin: 16px 0;">
          Verify Email
        </a>
        <p>Or copy and paste this link in your browser:</p>
        <p style="word-break: break-all; color: #666;">${verificationUrl}</p>
        <p>This link will expire in 24 hours.</p>
        <p>If you didn't create an account with EventAddis, please ignore this email.</p>
      </div>
    `;

    try {
      await this.sendWeb3FormsEmail(
        email,
        'Email Verification - EventAddis',
        htmlContent
      );
      return { success: true };
    } catch (error) {
      console.error('Email send error:', error.message);
      return { success: false, error: 'Email service temporarily unavailable' };
    }
  }

  async sendPasswordResetEmail(email: string, token: string) {
    const resetUrl = `${this.configService.get('FRONTEND_URL')}/reset-password?token=${token}`;
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Password Reset Request</h2>
        <p>You requested a password reset for your EventAddis account. Click the button below to reset your password:</p>
        <a href="${resetUrl}" style="background-color: #dc3545; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; margin: 16px 0;">
          Reset Password
        </a>
        <p>Or copy and paste this link in your browser:</p>
        <p style="word-break: break-all; color: #666;">${resetUrl}</p>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request a password reset, please ignore this email.</p>
      </div>
    `;

    try {
      await this.sendWeb3FormsEmail(
        email,
        'Password Reset - EventAddis',
        htmlContent
      );
      return { success: true };
    } catch (error) {
      console.error('Email send error:', error.message);
      return { success: false, error: 'Email service temporarily unavailable' };
    }
  }

  async sendEmail(to: string, subject: string, html: string) {
    try {
      await this.sendWeb3FormsEmail(to, subject, html);
      return { success: true };
    } catch (error) {
      console.error('Email send error:', error.message);
      return { success: false, error: 'Email service temporarily unavailable' };
    }
  }
}