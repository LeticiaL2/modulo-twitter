import { Body, Controller, Post } from '@nestjs/common'
import { CreateUserDTO } from './dto/create-user.dto'
import { UsersService } from './users.service'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ApiResponseCustom } from 'src/utils/decorators'
import { ResponseModel } from 'src/utils/models'
import { ResponseCreateUserDTO } from './dto/reponse-user.dto'

@ApiTags('usuarios')
@Controller('api/v1/usuarios')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um usuário' })
  @ApiResponseCustom(ResponseModel, ResponseCreateUserDTO, 201)
  @ApiResponseCustom(ResponseModel, ResponseCreateUserDTO, 400)
  @ApiResponse({
    status: 400,
    description: 'Usuário ou email já existem',
  })
  create(@Body() createUserDTO: CreateUserDTO) {
    return this.userService.create(createUserDTO)
  }
}
