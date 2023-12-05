import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { UserPayLoad } from './models/UserPayload';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './models/UserToken';
import { UnauthorizedError } from './errors/unauthorized.error';
import { ResponseModel } from './models/ResponseModels';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  login(user: User): ResponseModel<UserToken> {
    const payload: UserPayLoad = {
      sub: user.id,
      email: user.email,
      nome: user.nome,
      usuario: user.usuario,
    };

    const expiresInHours = 24;

    const data_expiracao = new Date();
    data_expiracao.setHours(data_expiracao.getHours() + expiresInHours);

    const jwtToken = this.jwtService.sign(payload, {
      expiresIn: expiresInHours * 3600,
    });

    const response = {
      status: true,
      mensagem: {
        codigo: 201,
        texto: 'Usuario logado com sucesso',
      },
      conteudo: {
        usuario: user.usuario,
        nome: user.nome,
        acessToken: jwtToken,
        data_expiracao,
        email: user.email,
        id: user.id,
      },
    };
    return response;
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findByEmail(email);

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.senha);

      if (isPasswordValid) {
        return {
          ...user,
          senha: undefined,
        };
      }
    }

    throw new UnauthorizedError('Email ou senha inválidos');
  }
}
