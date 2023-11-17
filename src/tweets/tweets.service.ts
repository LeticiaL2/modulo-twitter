import { Injectable } from '@nestjs/common';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UserFromJwt } from '../auth/models/UserFromJwt';

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
      };

      console.log(usuario);
      console.log('data', data);
      console.log('usuario.id', usuario.id);

      const tweet = await this.prisma.tweet.create({
        data,
      });

      console.log('Tweet criado:', tweet);

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
      console.error('Erro ao criar tweet:', error);
      return {
        status: false,
        mensagem: {
          codigo: 401,
          texto: 'erro ao criar o tweet.',
        },
        conteudo: null,
      };
    }
  }
}
