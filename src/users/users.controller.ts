import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { BadRequestExceptionFilter } from './filter/http-exception.filter';

@Controller('api/v1/usuarios')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @UseFilters(new BadRequestExceptionFilter())
  store(@Body() createUsersDto: CreateUserDto) {
    return this.usersService.create(createUsersDto);
  }
}
