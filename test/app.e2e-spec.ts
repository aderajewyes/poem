
/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../src/auth/auth.service';
import { PrismaService } from '../src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthenticationDto } from '../src/auth/dto/auth.dto';
import { ForbiddenException } from '@nestjs/common';
import * as argon2 from 'argon2';
import { AppModule } from '../src/app.module'; 
import * as request from 'supertest';



describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        PrismaService,
        JwtService,
        ConfigService,
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('login', () => {
    it('should throw ForbiddenException for incorrect credentials', async () => {
      const dto: AuthenticationDto = {
          email: 'invalid@gmail.com', password: 'wrongpassword',
          role: 'admin'
      };

      await expect(authService.login(dto)).rejects.toThrow(ForbiddenException);
      (ForbiddenException);
    });

    it('should generate a token for valid credentials', async () => {
      const mockUser = { id: 50, email: 'aderajew@gmail.com', role: 'user', password: await argon2.hash('password'),createdAt: new Date(),
      updatedAt: new Date(),firstname:"", lastname:"" };
      jest.spyOn(authService['prisma'].user, 'findUnique').mockResolvedValue(mockUser);
      jest.spyOn(argon2, 'verify').mockResolvedValue(true);

      const dto: AuthenticationDto = {
          email: 'aderajew@gmail.com', password: 'password',
          role: 'user'
      };
      const result = await authService.login(dto);

      expect(result).toHaveProperty('accepted_token');
    });
  });

  describe('signup', () => {
    
    it('should create a new user and generate a token', async () => {
        const mockUser = { id: 50, email: 'aderajew@gmail.com', role: 'user', password: await argon2.hash('password'),createdAt: new Date(),
        updatedAt: new Date(),firstname:"", lastname:"" };
      jest.spyOn(authService['prisma'].user, 'create').mockResolvedValue(mockUser);

      const dto: AuthenticationDto = { email: 'aderajew@gmail.com', password: 'password', role: 'user' };
      const result = await authService.signup(dto);

      expect(result).toHaveProperty('accepted_token');
    });
  });
});


describe('PoemController (e2e)', () => {
  let app;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/poems (POST) - should create a poem', async () => {
    const createPoemDto = {
      title: 'Test Poem',
      body: 'This is a test poem',
    };

    const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE4LCJlbWFpbCI6ImhlbGxvaGVsbG9AZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzA1MDYzOTAwLCJleHAiOjE3MDY3OTE5MDB9.kFJa5UbuUj_njLs0nRr_yTThAEkpJuHhJ3l7z3I2PTM';

    return request(app.getHttpServer())
      .post('/poems')
      .set('Authorization', `Bearer ${authToken}`)
      .send(createPoemDto)
      .expect(201)
      .then((response) => {
        expect(response.body.title).toEqual(createPoemDto.title);
        expect(response.body.body).toEqual(createPoemDto.body);
      });
  });


  it('/poems (GET) - should get all poems', async () => {
    const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE4LCJlbWFpbCI6ImhlbGxvaGVsbG9AZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzA1MDYzOTAwLCJleHAiOjE3MDY3OTE5MDB9.kFJa5UbuUj_njLs0nRr_yTThAEkpJuHhJ3l7z3I2PTM';

    return request(app.getHttpServer())
      .get('/poems')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200)
      .then((response) => {
console.log(response);
      });
  });

  it('/poems/:id (GET) - should get a specific poem', async () => {
    const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE4LCJlbWFpbCI6ImhlbGxvaGVsbG9AZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzA1MDYzOTAwLCJleHAiOjE3MDY3OTE5MDB9.kFJa5UbuUj_njLs0nRr_yTThAEkpJuHhJ3l7z3I2PTM';
    return request(app.getHttpServer())
      .get('/poems/10')
      .set('Authorization', `Bearer ${authToken}`)
      .then((response) => {
        console.log(response);
              });
      
  });

  it('/poems/:id (PATCH) - should update a specific poem', async () => {
    const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE4LCJlbWFpbCI6ImhlbGxvaGVsbG9AZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzA1MDYzOTAwLCJleHAiOjE3MDY3OTE5MDB9.kFJa5UbuUj_njLs0nRr_yTThAEkpJuHhJ3l7z3I2PTM';
    
    const updatePoemDto = {
      title:"it's good to see u",
      body:"yes"
    };

    return request(app.getHttpServer())
      .patch(`/poems/10`)
      .set('Authorization', `Bearer ${authToken}`)
      .send(updatePoemDto)
      .then((response) => {
console.log(response);
      });
  });

  it('/poems/:id (DELETE) - should delete a specific poem', async () => {
    const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE4LCJlbWFpbCI6ImhlbGxvaGVsbG9AZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzA1MDYzOTAwLCJleHAiOjE3MDY3OTE5MDB9.kFJa5UbuUj_njLs0nRr_yTThAEkpJuHhJ3l7z3I2PTM';

    return request(app.getHttpServer())
      .delete(`/poems/10`)
      .set('Authorization', `Bearer ${authToken}`)
      .then((response) => {
console.log(response);
      });
  });
});

