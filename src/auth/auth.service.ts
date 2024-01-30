import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtOptions } from 'src/config/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, senha: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Email incorreto');
    }

    if (!(await bcrypt.compare(senha, user.senha))) {
      throw new UnauthorizedException('Senha incorreta');
    }

    return {
      ...user,
      senha: undefined,
    };
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    const expiresIn = jwtOptions.signOptions.expiresIn;

    const expiresInSec = expiresIn.endsWith('h')
      ? parseInt(expiresIn) * 3600
      : parseInt(expiresIn);
    const expire_date = new Date(Date.now() + expiresInSec * 1000);

    return {
      token: this.jwtService.sign(payload),
      expire_date: expire_date,
      usuario: user.usuario,
      nome: user.nome,
    };
  }
}
