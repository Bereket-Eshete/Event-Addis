import { Injectable, BadRequestException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import { User, UserRole, UserStatus } from '../schemas/user.schema';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { EmailService } from './email.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
    private emailService: EmailService,
  ) {}

  async signup(signupDto: SignupDto) {
    const { email, password, fullName, role = UserRole.ATTENDEE, termsAccepted, ...otherFields } = signupDto;

    if (!termsAccepted) {
      throw new BadRequestException('Terms and conditions must be accepted');
    }

    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new this.userModel({
      fullName,
      email,
      password: hashedPassword,
      role,
      isEmailVerified: true,
      status: UserStatus.ACTIVE,
      termsAccepted,
      ...otherFields,
    });

    await user.save();
    
    const payload = { sub: user._id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);

    return {
      message: 'User registered successfully',
      access_token: token,
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email });

    if (!user || !user.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (user.status !== UserStatus.ACTIVE) {
      throw new UnauthorizedException('Account is not active');
    }

    const payload = { sub: user._id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
    };
  }

  async verifyEmail(token: string) {
    const user = await this.userModel.findOne({
      emailVerificationToken: token,
      emailVerificationExpires: { $gt: new Date() },
    });

    if (!user) {
      throw new BadRequestException('Invalid or expired verification token');
    }

    user.isEmailVerified = true;
    user.status = UserStatus.ACTIVE;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();

    return { message: 'Email verified successfully' };
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const { email } = forgotPasswordDto;
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new NotFoundException('User with this email does not exist');
    }

    return { 
      message: 'Email verified. You can now reset your password.',
      canReset: true,
      email: email
    };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const { email, newPassword } = resetPasswordDto;
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    user.password = hashedPassword;
    await user.save();

    return { message: 'Password reset successfully' };
  }

  async googleLogin(googleUser: any) {
    let user = await this.userModel.findOne({ googleId: googleUser.id });

    if (!user) {
      user = await this.userModel.findOne({ email: googleUser.email });
      
      if (user) {
        user.googleId = googleUser.id;
        await user.save();
      } else {
        user = new this.userModel({
          fullName: googleUser.displayName,
          email: googleUser.email,
          googleId: googleUser.id,
          role: UserRole.ATTENDEE,
          isEmailVerified: true,
          status: UserStatus.ACTIVE,
          termsAccepted: true,
        });
        await user.save();
      }
    }

    const payload = { sub: user._id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
    };
  }

  async getProfile(userId: string) {
    const user = await this.userModel.findById(userId).select('-password -emailVerificationToken -passwordResetToken');
    
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      status: user.status,
      isEmailVerified: user.isEmailVerified,
      organizationName: user.organizationName,
      organizationWebsite: user.organizationWebsite,
      contactNumber: user.contactNumber,
      profilePicture: user.profilePicture,
      createdAt: (user as any).createdAt,
      updatedAt: (user as any).updatedAt,
    };
  }

  async updateProfile(userId: string, updateData: any) {
    const user = await this.userModel.findById(userId);
    
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Only allow updating specific fields
    const allowedFields = ['fullName', 'contactNumber', 'organizationName', 'organizationWebsite'];
    const updateFields = {};
    
    for (const field of allowedFields) {
      if (updateData[field] !== undefined) {
        updateFields[field] = updateData[field];
      }
    }

    const updatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      updateFields,
      { new: true }
    ).select('-password -emailVerificationToken -passwordResetToken');

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    return {
      message: 'Profile updated successfully',
      user: {
        id: updatedUser._id,
        fullName: updatedUser.fullName,
        email: updatedUser.email,
        role: updatedUser.role,
        status: updatedUser.status,
        isEmailVerified: updatedUser.isEmailVerified,
        organizationName: updatedUser.organizationName,
        organizationWebsite: updatedUser.organizationWebsite,
        contactNumber: updatedUser.contactNumber,
        profilePicture: updatedUser.profilePicture,
        createdAt: (updatedUser as any).createdAt,
        updatedAt: (updatedUser as any).updatedAt,
      }
    };
  }

  async testEmail(email: string) {
    try {
      console.log('🧪 Testing email service for:', email);
      const result = await this.emailService.sendEmail(
        email,
        'Test Email - EventAddis',
        '<h2>Test Email</h2><p>This is a test email from EventAddis to verify the email service is working.</p>'
      );
      console.log('🧪 Test email result:', result);
      return { success: true, message: 'Test email sent successfully' };
    } catch (error) {
      console.error('🧪 Test email failed:', error);
      return { success: false, error: error.message };
    }
  }
}