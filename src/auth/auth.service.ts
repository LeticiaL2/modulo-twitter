import { Injectable, UnauthorizedException } from '@nestjs/common'
import { compare } from 'bcrypt'
import { UsersService } from 'src/users/users.service'
import { JwtService } from '@nestjs/jwt'
import { User } from 'src/users/entities/users.entity'
import { UserPayload } from './dto/UserPayload'
import { UserToken } from './dto/UserToken'
import { convertToMilliseconds } from 'src/helpers/expirationDate.helper'
import { ResponseModel } from 'src/utils/models'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  login(user: User): ResponseModel<UserToken> {
    const payload: UserPayload = {
      sub: user.id,
      usuario: user.usuario,
      email: user.email,
      nome: user.nome,
    }

    const jwtToken = this.jwtService.sign(payload)
    const expirationDate = new Date(
      Date.now() + convertToMilliseconds(process.env.JWT_EXPIRATION),
    )

    const response = {
      status: true,
      mensagem: {
        codigo: 201,
        texto: 'Usuário logado com sucesso',
      },
      conteudo: {
        usuario: user.usuario,
        nome: user.nome,
        token: jwtToken,
        data_expiracao: expirationDate,
      },
    }

    return response
  }

  async validateUser(email: string, senha: string) {
    const user = await this.usersService.findByEmail(email)
    if (user) {
      const isPasswordValid = await compare(senha, user.senha)
      if (isPasswordValid) return user
    }

    throw new UnauthorizedException({
      status: false,
      mensagem: {
        codigo: 401,
        texto: 'Email e/ou senha inválidos',
      },
      conteudo: null,
    })
  }
}
