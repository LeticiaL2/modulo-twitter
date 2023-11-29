import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { AuthService } from '../auth.service'
import { Injectable } from '@nestjs/common'
// import { UnauthorizedException } from '@nestjs/common'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'senha',
    })
  }

  async validate(email: string, senha: string): Promise<any> {
    return await this.authService.validateUser(email, senha)
  }
}
