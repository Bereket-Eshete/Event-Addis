import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../../src/schemas/user.schema';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let mockUserModel: any;

  beforeEach(async () => {
    mockUserModel = {
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      deleteMany: jest.fn(),
    };

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(getModelToken(User.name))
      .useValue(mockUserModel)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('/auth/signup (POST)', () => {
    it('should create a new user', () => {
      const signupData = {
        fullName: 'Test User',
        email: 'test@test.com',
        password: 'password123',
        role: 'attendee',
        termsAccepted: true,
      };

      mockUserModel.findOne.mockResolvedValue(null);
      mockUserModel.create.mockResolvedValue({
        _id: 'user-id',
        ...signupData,
        password: 'hashed-password',
      });

      return request(app.getHttpServer())
        .post('/auth/signup')
        .send(signupData)
        .expect(201)
        .expect((res) => {
          expect(res.body.user.email).toBe(signupData.email);
          expect(res.body.access_token).toBeDefined();
        });
    });

    it('should return 400 for invalid data', () => {
      return request(app.getHttpServer())
        .post('/auth/signup')
        .send({
          email: 'invalid-email',
          password: '123', // too short
        })
        .expect(400);
    });
  });

  describe('/auth/login (POST)', () => {
    it('should login existing user', () => {
      const loginData = {
        email: 'test@test.com',
        password: 'password123',
      };

      mockUserModel.findOne.mockResolvedValue({
        _id: 'user-id',
        email: 'test@test.com',
        password: '$2a$10$hashedpassword',
        role: 'attendee',
      });

      return request(app.getHttpServer())
        .post('/auth/login')
        .send(loginData)
        .expect(200)
        .expect((res) => {
          expect(res.body.user.email).toBe(loginData.email);
          expect(res.body.access_token).toBeDefined();
        });
    });

    it('should return 401 for invalid credentials', () => {
      mockUserModel.findOne.mockResolvedValue(null);

      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'nonexistent@test.com',
          password: 'password123',
        })
        .expect(401);
    });
  });
});