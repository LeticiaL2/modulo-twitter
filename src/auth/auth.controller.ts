import { Controller, Post, Request, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
import { ApiResponseCustom } from 'src/utils/decorators'
import { ResponseModel } from 'src/utils/models'
import { AuthService } from './auth.service'
import { AuthRequest } from './dto/AuthRequest'
import { AuthUserFailureSwagger } from './dto/AuthUserSwagger.swager'
import { UserToken } from './dto/UserToken'
import { AuthUserDTO } from './dto/auth-user.dto'

@ApiTags('auth')
@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post()
  @ApiOperation({ summary: 'Realiza login' })
  @ApiBody({
    type: AuthUserDTO,
  })
  @ApiResponseCustom(ResponseModel, UserToken, 201)
  @ApiResponseCustom(ResponseModel, AuthUserFailureSwagger, 401)
  login(@Request() req: AuthRequest) {
    return this.authService.login(req.user)
  }
}
