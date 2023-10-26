import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from 'src/modules/auth/service/auth.service';
import { UsersService } from 'src/modules/users/service/users.service';

describe('AuthService', () => {
  let service: AuthService;

  const userMock: any = {
    id: 1,
    username: 'dev',
    password:
      'AI1/AEdFABIHluxVmTa1aKfLuFwccQ5fwNCbgJnLk8ooWUoMJCZL+y7MB35+Vi9PtA==',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UsersService, JwtService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should call "validateUser" and return a valid user', async () => {
    const expected = { username: 'dev' };
    const user = await service.validateUser(
      userMock.username,
      userMock.password,
    );

    expect(user).toEqual(expected);
  });

  it('Should call "validateUser" and return null', async () => {
    const user = await service.validateUser(userMock.username, 'wrongPassword');

    expect(user).toBeNull();
  });

  /*it('Should call "login" and return a token', async () => {
    const user = await service.login({
      username: userMock.username,
      userId: userMock.id,
    });

    expect(user).toBeTruthy();
  });*/
});
