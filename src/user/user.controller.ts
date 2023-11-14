import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseModel } from 'src/auth/models/ResponseModels';

@ApiTags('usuarios')
@Controller('usuario')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @IsPublic()
  @ApiResponse({
    status: 201,
    description: 'Usuário criado com sucesso',
    type: ResponseModel,
  })
  @ApiResponse({
    status: 400,
    description: 'Falha ao criar usuário',
    type: ResponseModel,
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
