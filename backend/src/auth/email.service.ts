import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as brevo from '@getbrevo/brevo';

@Injectable()
export class EmailService {
  constructor(private configService: ConfigService) {
    console.log('📧 Initializing email service with Brevo API');
    console.log('📧 Brevo API Key:', this.configService.get('BREVO_API_KEY') ? 'Set' : 'Not set');
  }

  async sendVerificationEmail(email: string, token: string) {
    try {
      console.log('📧 Sending verification email to:', email);
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

      const result = await this.sendBrevoEmail(email, 'EventAddis - Verify Your Email', htmlContent);
      console.log('✅ Verification email sent successfully');
      console.log('📧 Brevo response body:', result.body);
    } catch (error) {
      console.error('💥 Failed to send verification email:', error);
      throw error;
    }
  }

  async sendPasswordResetEmail(email: string, token: string) {
    try {
      console.log('📧 Sending password reset email to:', email);
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

      const result = await this.sendBrevoEmail(email, 'EventAddis - Password Reset', htmlContent);
      console.log('✅ Password reset email sent successfully');
      console.log('📧 Brevo response body:', result.body);
    } catch (error) {
      console.error('💥 Failed to send password reset email:', error);
      throw error;
    }
  }

  async sendEmail(to: string, subject: string, html: string) {
    try {
      console.log('📧 Sending email to:', to, 'Subject:', subject);
      const result = await this.sendBrevoEmail(to, subject, html);
      console.log('✅ Email sent successfully');
      console.log('📧 Brevo response body:', result.body);
    } catch (error) {
      console.error('💥 Failed to send email:', error);
      throw error;
    }
  }

  private async sendBrevoEmail(to: string, subject: string, htmlContent: string, fromName = 'EventAddis') {
    const apiInstance = new brevo.TransactionalEmailsApi();
    apiInstance.setApiKey(
      brevo.TransactionalEmailsApiApiKeys.apiKey,
      this.configService.get('BREVO_API_KEY')
    );

    const sendSmtpEmail = new brevo.SendSmtpEmail();
    sendSmtpEmail.to = [{ email: to }];
    sendSmtpEmail.sender = {
      name: fromName,
      email: this.configService.get('EMAIL_USER') || '89338a001@smtp-brevo.com',
    };
    sendSmtpEmail.subject = subject;
    sendSmtpEmail.htmlContent = htmlContent;

    return await apiInstance.sendTransacEmail(sendSmtpEmail);
  }
}