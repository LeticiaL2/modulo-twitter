import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UserFromJwt } from '../auth/models/UserFromJwt';
import { Request } from 'express';

@Injectable()
export class TweetsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async create(createTweetDto: CreateTweetDto, usuario: UserFromJwt) {
    try {
      const data = {
        ...createTweetDto,
        usuarioId: usuario.id,
        data_criacao: new Date(),
      };

      const tweet = await this.prisma.tweet.create({
        data,
      });

      return {
        status: true,
        mensagem: {
          codigo: 200,
          texto: 'Tweet criado com sucesso.',
        },
        conteudo: {
          ...tweet,
        },
      };
    } catch (error) {
      throw new UnauthorizedException('Usuário não autenticado.');
    }
  }

  private getUsuarioFromToken(request: Request): UserFromJwt {
    const authorizationHeader = request.headers.authorization;

    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Token JWT não encontrado na solicitação.',
      );
    }

    const token = authorizationHeader.replace('Bearer ', '');
    const usuario = this.jwtService.decode(token) as UserFromJwt;

    if (!usuario) {
      throw new UnauthorizedException('Token JWT inválido.');
    }

    return usuario;
  }
}
