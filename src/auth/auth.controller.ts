import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/AuthRequest';
import { IsPublic } from './decorators/is-public.decorator';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginRequestBody } from './models/LoginRequestBody';
import { ResponseModel } from './models/ResponseModels';

@ApiTags('login')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @IsPublic()
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @ApiResponse({
    status: 201,
    description: 'Usuário logado com sucesso',
    type: ResponseModel,
  })
  @ApiResponse({
    status: 401,
    description: 'Falha ao logar',
    type: ResponseModel,
  })
  @ApiBody({
    type: LoginRequestBody,
  })
  login(@Request() req: AuthRequest) {
    console.log(req.user);

    return this.authService.login(req.user);
  }
}
