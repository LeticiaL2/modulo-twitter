import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AuthModule } from '../../../src/modules/auth/auth.module';
import { HttpModule, HttpService } from '@nestjs/axios';
import { AuthService } from 'src/modules/auth/service/auth.service';
import { ProcessorService } from 'src/modules/processor/service/processor.service';
import { of } from 'rxjs';
import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { UsersService } from 'src/modules/users/service/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

describe('Auth (e2e)', () => {
  let app: INestApplication;
  let httpService: HttpService;

  const loginCredentialsMock: any = {
    username: 'testUser',
    password: 'testPassword',
  };

  const loginResponseMock: any = {
    access_token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RVc2VyIiwic3ViIjoyLCJpYXQiOjE2Nzc3NjgzMTAsImV4cCI6MTY3Nzc2ODYxMH0.XqqGvYyQnoKTU-e96wn5nPDs5tbZqM8MHB7WcSLZnbY',
  };

  const mockRequest = {
    id: 1,
    logInfo: {
      VersaoXML: 1,
      RequestId: 1,
      TimeOut: 1,
    },
    token:
      'Bearer eyJ0eXAiOiJKV1QiLCJraWQiOiIwNDU0ZGFmYTgwZmM0YWFiYTYwMTc0NTM5YzRiMmFkMyIsImFsZyI6IlJTMjU2In0.eyJqdGkiOiIyNTQ2MmEzYi01Y2VlLTQ3MTEtOTUzMi1iMzExYjExNWI3ODEiLCJpc3MiOiJDREdleXJCRVRJN29QWmtoRVVzV05wUXFzUllyMmNWQiIsImlhdCI6MTY0OTQ0NjUwNywic3ViIjoiQ0RHZXlyQkVUSTdvUFpraEVVc1dOcFFxc1JZcjJjVkIiLCJleHAiOjQ4MDUxMjAxMDcsInRzaSI6InNlcnZpY2VzLXNpZ24iLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzZXJ2aWNlIjp7Im5hbWUiOiJHZXJtZXMgU2VydmljZSJ9fQ',
  };
  const ProcessorServiceStub = {};

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AuthModule, HttpModule],
      providers: [
        {
          provide: ProcessorService,
          useValue: ProcessorServiceStub,
        },
        AuthService,
        UsersService,
        JwtService,
      ],
    })
      .overrideGuard(AuthGuard())
      .useValue({ canActivate: () => true })
      .compile();

    app = moduleFixture.createNestApplication();
    httpService = moduleFixture.get<HttpService>(HttpService);
    await app.init();
  });

  it('auth/login (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginCredentialsMock)
      .expect(201);
    expect(response.body.access_token).toBeTruthy();
  });
});
