import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './users.repository';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    private userRepository: UserRepository,
  ) {}
  
  async createUser(createUserDto: CreateUserDto): Promise<User> {
      return this.userRepository.createUser(createUserDto);
  }
}