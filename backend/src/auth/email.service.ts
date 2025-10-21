import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as brevo from '@getbrevo/brevo';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private gmailTransporter;

  constructor(private configService: ConfigService) {
    console.log(
      '📧 Initializing email service with Brevo API and Gmail backup',
    );
    console.log(
      '📧 Brevo API Key:',
      this.configService.get('BREVO_API_KEY') ? 'Set' : 'Not set',
    );

    // Gmail backup transporter
    this.gmailTransporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get('EMAIL_USER'),
        pass: this.configService.get('EMAIL_PASS'),
      },
    });
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

      const result = await this.sendBrevoEmail(
        email,
        'EventAddis - Verify Your Email',
        htmlContent,
      );
      console.log('✅ Verification email sent successfully');
      console.log('📧 Brevo response body:', result.body);
    } catch (error) {
      console.error('💥 Failed to send verification email:', error);
      throw error;
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

    // Try Gmail first (more reliable)
    try {
      console.log('📧 Trying Gmail for password reset email to:', email);
      await this.sendGmailEmail(
        email,
        'EventAddis - Password Reset',
        htmlContent,
      );
      console.log('✅ Password reset email sent via Gmail');
    } catch (gmailError) {
      console.log('⚠️ Gmail failed, trying Brevo:', gmailError.message);
      try {
        const result = await this.sendBrevoEmail(
          email,
          'EventAddis - Password Reset',
          htmlContent,
        );
        console.log('✅ Password reset email sent via Brevo:', result.body);
      } catch (brevoError) {
        console.error('💥 Both Gmail and Brevo failed:', brevoError);
        throw brevoError;
      }
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

  private async sendBrevoEmail(
    to: string,
    subject: string,
    htmlContent: string,
    fromName = 'EventAddis',
  ) {
    const apiInstance = new brevo.TransactionalEmailsApi();
    apiInstance.setApiKey(
      brevo.TransactionalEmailsApiApiKeys.apiKey,
      this.configService.get('BREVO_API_KEY') || '',
    );

    const sendSmtpEmail = new brevo.SendSmtpEmail();
    sendSmtpEmail.to = [{ email: to }];
    sendSmtpEmail.sender = {
      name: fromName,
      email: this.configService.get('EMAIL_USER') || '89338a001@smtp-brevo.com',
    };
    sendSmtpEmail.subject = subject;
    sendSmtpEmail.htmlContent = htmlContent;

    console.log('📧 Sending email with config:', {
      to: sendSmtpEmail.to,
      sender: sendSmtpEmail.sender,
      subject: sendSmtpEmail.subject,
      apiKey: this.configService.get('BREVO_API_KEY') ? 'Set' : 'Not set',
    });

    return await apiInstance.sendTransacEmail(sendSmtpEmail);
  }

  private async sendGmailEmail(to: string, subject: string, html: string) {
    const mailOptions = {
      from: this.configService.get('EMAIL_USER'),
      to,
      subject,
      html,
    };

    return await this.gmailTransporter.sendMail(mailOptions);
  }
}
