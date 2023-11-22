import { Injectable } from '@nestjs/common';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UserFromJwt } from '../auth/models/UserFromJwt';
import { TweetResponseDto } from './dto/tweet-response.dto';
import { CreateLikeDto } from './dto/create-like.dto';
import { Like } from './entities/like.entity';
import { ResponseModel } from 'src/auth/models/ResponseModels';
import { CreateComentarioDto } from './dto/create-comentario.dto';

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

  async getAllTweets(usuario: UserFromJwt): Promise<TweetResponseDto[]> {
    const tweets = await this.prisma.tweet.findMany({
      include: {
        usuario: true,
        likes: true,
        comentarios: true,
      },
    });

    const formattedTweets = tweets.map((tweet) => ({
      id: tweet.id,
      texto: tweet.texto,
      usuarioId: tweet.usuarioId,
      usuario: usuario.usuario,
      nome: usuario.nome,
      likes: tweet.likes.length,
      comentarios: tweet.comentarios.length,
      //retweets: tweet.retweets.length,
      data: tweet.data_criacao,
    }));

    return formattedTweets;
  }
  catch(error) {
    console.error('Erro ao recuperar tweets:', error);
    throw new Error('Erro ao recuperar tweets.');
  }

  async createLike(createLikeDto: CreateLikeDto): Promise<Like | null> {
    try {
      const existingLike = await this.prisma.likes.findFirst({
        where: {
          tweetId: createLikeDto.tweetId,
          usuarioId: createLikeDto.usuarioId,
        },
      });

      if (existingLike) {
        const deletedLike = await this.prisma.likes.deleteMany({
          where: {
            tweetId: createLikeDto.tweetId,
            usuarioId: createLikeDto.usuarioId,
          },
        });

        if (deletedLike.count > 0) {
          return null;
        }
      } else {
        const newLike = await this.prisma.likes.create({
          data: {
            tweetId: createLikeDto.tweetId,
            usuarioId: createLikeDto.usuarioId,
          },
        });

        return newLike;
      }
    } catch (error) {
      console.error('Erro ao criar/remover like:', error);
      return null;
    }
  }

  handleLikeResponse(result: Like | null): ResponseModel<Like | null> {
    if (result) {
      const likeStatus = result ? 'criado' : 'removido';
      return {
        status: true,
        mensagem: {
          codigo: 200,
          texto: `Like ${likeStatus} com sucesso.`,
        },
        conteudo: result,
      };
    } else {
      return {
        status: false,
        mensagem: {
          codigo: 500,
          texto: 'Like removido.',
        },
        conteudo: null,
      };
    }
  }

  async createComentario(
    createComentarioDto: CreateComentarioDto,
    usuario: UserFromJwt,
    tweetPaiId: number,
  ) {
    try {
      const tweet = await this.prisma.tweet.create({
        data: {
          texto: createComentarioDto.texto,
          usuarioId: usuario.id,
        },
      });

      const comentario = await this.prisma.comentarios.create({
        data: {
          tweetId: tweet.id,
          tweetPaiId: tweetPaiId,
        },
      });

      console.log('Comentário criado:', comentario);

      return {
        status: true,
        mensagem: {
          codigo: 200,
          texto: 'Comentário criado com sucesso.',
        },
        conteudo: {
          ...comentario,
        },
      };
    } catch (error) {
      console.error('Erro ao criar comentário:', error);
      return {
        status: false,
        mensagem: {
          codigo: 401,
          texto: 'Erro ao criar o comentário.',
        },
        conteudo: null,
      };
    }
  }
}
