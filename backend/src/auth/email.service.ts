import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    // Create Gmail transporter as fallback
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'bereketeshete63@gmail.com',
        pass: 'wvsisnpxmkrvqgan', // Your app password
      },
    });
    console.log('📧 Initializing email service with Gmail SMTP');
  }

  private async sendGmailEmail(
    to: string,
    subject: string,
    html: string
  ) {
    try {
      console.log('📧 Attempting to send email via Gmail to:', to);
      
      const mailOptions = {
        from: '"EventAddis Team" <bereketeshete63@gmail.com>',
        to: to,
        subject: subject,
        html: html,
      };
      
      const result = await this.transporter.sendMail(mailOptions);
      console.log('✅ Email sent successfully via Gmail:', result.messageId);
      return { success: true, messageId: result.messageId };
    } catch (error) {
      console.error('❌ Gmail email failed:', error.message);
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
      console.log('📧 Sending verification email to:', email);
      const result = await this.sendGmailEmail(
        email,
        'Email Verification - EventAddis',
        htmlContent
      );
      console.log('✅ Verification email sent successfully');
      return { success: true };
    } catch (error) {
      console.error('❌ Verification email failed:', error.message);
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
      console.log('📧 Sending password reset email to:', email);
      const result = await this.sendGmailEmail(
        email,
        'Password Reset - EventAddis',
        htmlContent
      );
      console.log('✅ Password reset email sent successfully');
      return { success: true };
    } catch (error) {
      console.error('❌ Password reset email failed:', error.message);
      return { success: false, error: 'Email service temporarily unavailable' };
    }
  }

  async sendEmail(to: string, subject: string, html: string) {
    try {
      await this.sendGmailEmail(to, subject, html);
      return { success: true };
    } catch (error) {
      console.error('Email send error:', error.message);
      return { success: false, error: 'Email service temporarily unavailable' };
    }
  }
}