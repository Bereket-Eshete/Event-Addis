import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../../src/schemas/user.schema';
import * as bcrypt from 'bcryptjs';

describe('AuthService', () => {
  let service: AuthService;
  let mockUserModel: any;
  let mockJwtService: any;

  beforeEach(async () => {
    mockUserModel = {
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
    };

    mockJwtService = {
      sign: jest.fn().mockReturnValue('mock-token'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  describe('signup', () => {
    it('should create a new user successfully', async () => {
      const signupDto = {
        fullName: 'Test User',
        email: 'test@test.com',
        password: 'password123',
        role: 'attendee',
        termsAccepted: true,
      };

      mockUserModel.findOne.mockResolvedValue(null);
      mockUserModel.create.mockResolvedValue({
        _id: 'user-id',
        ...signupDto,
        password: 'hashed-password',
      });

      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashed-password' as never);

      const result = await service.signup(signupDto);

      expect(result.user.email).toBe(signupDto.email);
      expect(result.access_token).toBe('mock-token');
      expect(mockUserModel.create).toHaveBeenCalledWith({
        ...signupDto,
        password: 'hashed-password',
      });
    });

    it('should throw error if user already exists', async () => {
      const signupDto = {
        fullName: 'Test User',
        email: 'test@test.com',
        password: 'password123',
        role: 'attendee',
        termsAccepted: true,
      };

      mockUserModel.findOne.mockResolvedValue({ email: 'test@test.com' });

      await expect(service.signup(signupDto)).rejects.toThrow('User already exists');
    });
  });

  describe('login', () => {
    it('should login user successfully', async () => {
      const loginDto = {
        email: 'test@test.com',
        password: 'password123',
      };

      const mockUser = {
        _id: 'user-id',
        email: 'test@test.com',
        password: 'hashed-password',
        role: 'attendee',
      };

      mockUserModel.findOne.mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);

      const result = await service.login(loginDto);

      expect(result.user.email).toBe(loginDto.email);
      expect(result.access_token).toBe('mock-token');
    });

    it('should throw error for invalid credentials', async () => {
      const loginDto = {
        email: 'test@test.com',
        password: 'wrongpassword',
      };

      mockUserModel.findOne.mockResolvedValue(null);

      await expect(service.login(loginDto)).rejects.toThrow('Invalid credentials');
    });
  });
});