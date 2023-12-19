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
import { CreateRetweetDto } from './dto/create-retweet.dto';

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

  async getTweetByTweetPaiId(
    tweetPaiId: number,
  ): Promise<TweetResponseDto | null> {
    try {
      const tweetRetweetPai = await this.prisma.tweet.findUnique({
        where: {
          id: tweetPaiId,
        },
        include: {
          usuario: {
            select: {
              usuario: true,
              nome: true,
            },
          },
          likes: true,
          comentarios: true,
          retweets: true,
        },
      });

      return tweetRetweetPai
        ? {
            id: tweetRetweetPai.id,
            texto: tweetRetweetPai.texto,
            usuarioId: tweetRetweetPai.usuarioId,
            usuario: tweetRetweetPai.usuario.usuario,
            nome: tweetRetweetPai.usuario.nome,
            likes: tweetRetweetPai.likes.length,
            liked: tweetRetweetPai.liked,
            retweeted: tweetRetweetPai.retweeted,
            isDeleted: tweetRetweetPai.isDeleted,
            comentarios: tweetRetweetPai.comentarios.length,
            retweets: tweetRetweetPai.retweets.length,
            data: tweetRetweetPai.data_criacao,
          }
        : null;
    } catch (error) {
      console.error('Erro ao obter tweet pelo ID:', error);
      throw new Error('Erro ao obter tweet pelo ID.');
    }
  }

  async getAllTweets(usuarioId: number): Promise<TweetResponseDto[]> {
    try {
      const tweets = await this.prisma.tweet.findMany({
        where: {
          comentarioPai: { none: {} },
          isDeleted: false,
        },
        include: {
          usuario: true,
          likes: true,
          comentarios: true,
          retweets: true,
          retweetPai: true,
        },
        orderBy: {
          data_criacao: 'desc',
        },
      });

      const formattedTweets = await Promise.all(
        tweets.map(async (tweet) => {
          let tweetPaiId: number | null = null;
          let tweetPai: TweetResponseDto | null = null;

          if (tweet.retweetPai && tweet.retweetPai.length > 0) {
            tweetPaiId = tweet.retweetPai[0].tweetPaiId;
            tweetPai = await this.getTweetByTweetPaiId(tweetPaiId);
          }

          const comentariosArray = await this.getTweetWithComments(tweet.id);

          const existingLike = await this.prisma.likes.findFirst({
            where: {
              tweetId: tweet.id,
              usuarioId: usuarioId,
            },
          });

          const liked = !!existingLike;

          const existingRetweet = await this.prisma.retweet.findFirst({
            where: {
              tweetId: tweet.id,
              usuarioId: usuarioId,
            },
          });

          const retweeted = !!existingRetweet;

          return {
            id: tweet.id,
            texto: tweet.texto,
            usuarioId: tweet.usuarioId,
            usuario: tweet.usuario.usuario,
            nome: tweet.usuario.nome,
            likes: tweet.likes.length,
            liked: liked,
            comentarios: tweet.comentarios.length,
            retweets: tweet.retweets.length,
            data: tweet.data_criacao,
            retweeted: retweeted,
            isDeleted: tweet.isDeleted,
            tweetPai: tweetPai ? [tweetPai] : null,
            comentariosArray:
              comentariosArray?.conteudo?.comentariosArray || [],
          };
        }),
      );

      return formattedTweets;
    } catch (error) {
      console.error('Erro ao recuperar tweets:', error);
      throw new Error('Erro ao recuperar tweets.');
    }
  }

  async createLike(
    createLikeDto: CreateLikeDto,
  ): Promise<ResponseModel<Like | null>> {
    try {
      const existingTweet = await this.prisma.tweet.findUnique({
        where: {
          id: createLikeDto.tweetId,
        },
      });

      if (!existingTweet) {
        console.error('Tweet não encontrado.');
        return {
          status: false,
          mensagem: {
            codigo: 404,
            texto: 'Tweet não encontrado.',
          },
          conteudo: null,
        };
      }

      const existingLike = await this.prisma.likes.findFirst({
        where: {
          tweetId: createLikeDto.tweetId,
          usuarioId: createLikeDto.usuarioId,
        },
      });

      if (existingLike && existingLike.usuarioId === createLikeDto.usuarioId) {
        const deletedLike = await this.prisma.likes.deleteMany({
          where: {
            tweetId: createLikeDto.tweetId,
            usuarioId: createLikeDto.usuarioId,
          },
        });

        if (deletedLike.count > 0) {
          await this.prisma.tweet.update({
            where: { id: createLikeDto.tweetId },
            data: { liked: false },
          });

          return {
            status: true,
            mensagem: {
              codigo: 200,
              texto: 'Like removido com sucesso.',
            },
            conteudo: null,
          };
        }
      } else {
        const newLike = await this.prisma.likes.create({
          data: {
            tweetId: createLikeDto.tweetId,
            usuarioId: createLikeDto.usuarioId,
          },
        });

        await this.prisma.tweet.update({
          where: { id: createLikeDto.tweetId },
          data: { liked: true },
        });

        return {
          status: true,
          mensagem: {
            codigo: 201,
            texto: 'Like criado com sucesso.',
          },
          conteudo: newLike,
        };
      }
    } catch (error) {
      console.error('Erro ao criar/remover like:', error);
      return {
        status: false,
        mensagem: {
          codigo: 500,
          texto: 'Erro ao criar/remover like.',
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
      const tweetPai = await this.prisma.tweet.findUnique({
        where: { id: tweetPaiId },
      });

      if (!tweetPai) {
        console.error('Tweet pai não encontrado.');
        return {
          status: false,
          mensagem: {
            codigo: 401,
            texto: 'Tweet pai não encontrado.',
          },
          conteudo: null,
        };
      }
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
          usuarioId: usuario.id,
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
          texto: tweet.texto,
          tipo: 'comentario',
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

  async createRetweet(
    createRetweetDto: CreateRetweetDto,
    usuario: UserFromJwt,
    tweetPaiId: number,
  ) {
    try {
      const tweetPai = await this.prisma.tweet.findUnique({
        where: { id: tweetPaiId },
      });

      if (!tweetPai) {
        console.error('Tweet pai não encontrado.');
        return {
          status: false,
          mensagem: {
            codigo: 401,
            texto: 'Tweet pai não encontrado.',
          },
          conteudo: null,
        };
      }

      const existingRetweet = await this.prisma.tweet.findFirst({
        where: {
          id: tweetPaiId,
          retweeted: true,
          usuarioId: usuario.id,
        },
      });

      if (existingRetweet) {
        return {
          status: false,
          mensagem: {
            codigo: 200,
            texto: 'Você já retuitou este tweet.',
          },
          conteudo: null,
        };
      }

      const tweet = await this.prisma.tweet.create({
        data: {
          texto: createRetweetDto.texto,
          usuarioId: usuario.id,
          retweeted: true,
        },
      });

      const retweet = await this.prisma.retweet.create({
        data: {
          tweetId: tweet.id,
          tweetPaiId: tweetPaiId,
          usuarioId: usuario.id,
        },
      });

      console.log('Retweet criado:', retweet);

      await this.prisma.tweet.update({
        where: { id: tweetPaiId },
        data: { retweeted: true },
      });

      return {
        status: true,
        mensagem: {
          codigo: 200,
          texto: 'Retweet criado com sucesso.',
        },
        conteudo: retweet,
      };
    } catch (error) {
      console.error('Erro ao criar retweet:', error);
      return {
        status: false,
        mensagem: {
          codigo: 401,
          texto: 'Erro ao criar retweet.',
        },
        conteudo: null,
      };
    }
  }

  async getTweetWithComments(
    tweetId: number,
  ): Promise<ResponseModel<TweetResponseDto | null>> {
    const tweetOriginal = await this.prisma.tweet.findUnique({
      where: { id: tweetId },
      include: {
        likes: true,
        retweets: true,
        comentarios: true,
        usuario: true,
      },
    });

    if (!tweetOriginal) {
      console.error('Tweet não encontrado.');
      return {
        status: false,
        mensagem: {
          codigo: 401,
          texto: 'Tweet não encontrado.',
        },
        conteudo: null,
      };
    }

    const comentarios = await this.prisma.comentarios.findMany({
      where: { tweetPaiId: tweetId },
    });

    const tweetIds = comentarios.map((comentario) => comentario.tweetId);

    const tweetsComentarios = await this.prisma.tweet.findMany({
      where: {
        id: {
          in: tweetIds,
        },
      },
      include: {
        comentarios: true,
        likes: true,
        retweets: true,
        usuario: true,
      },
      orderBy: {
        data_criacao: 'desc',
      },
    });

    const formattedComentarios = tweetsComentarios.map((comentario) => ({
      id: comentario.id,
      texto: comentario.texto,
      usuarioId: comentario.usuarioId,
      nome: comentario.usuario.nome,
      usuario: comentario.usuario.usuario,
      likes: comentario.likes.length,
      liked: comentario.liked,
      retweeted: comentario.retweeted,
      isDeleted: comentario.isDeleted,
      comentarios: comentario.comentarios.length,
      retweets: comentario.retweets.length,
      data: comentario.data_criacao,
    }));

    const formattedTweet: TweetResponseDto = {
      id: tweetOriginal.id,
      texto: tweetOriginal.texto,
      usuarioId: tweetOriginal.usuarioId,
      usuario: tweetOriginal.usuario.usuario,
      nome: tweetOriginal.usuario.nome,
      likes: tweetOriginal.likes.length,
      liked: tweetOriginal.liked,
      retweeted: tweetOriginal.retweeted,
      isDeleted: tweetOriginal.isDeleted,
      comentarios: tweetOriginal.comentarios.length,
      retweets: tweetOriginal.retweets.length,
      data: tweetOriginal.data_criacao,
      comentariosArray: formattedComentarios,
    };

    return {
      status: true,
      mensagem: {
        codigo: 200,
        texto: 'Tweet encontrado com sucesso.',
      },
      conteudo: formattedTweet,
    };
  }

  async deleteTweet(
    tweetId: number,
  ): Promise<ResponseModel<TweetResponseDto | null>> {
    try {
      const updatedTweet = await this.prisma.tweet.update({
        where: { id: tweetId },
        data: { isDeleted: true },
      });

      if (!updatedTweet) {
        return {
          status: false,
          mensagem: {
            codigo: 404,
            texto: 'Tweet não encontrado.',
          },
          conteudo: null,
        };
      }

      return {
        status: true,
        mensagem: {
          codigo: 200,
          texto: 'Tweet excluído com sucesso.',
        },
        conteudo: null,
      };
    } catch (error) {
      console.error('Erro ao excluir tweet:', error);
      return {
        status: false,
        mensagem: {
          codigo: 500,
          texto: 'Erro ao excluir tweet.',
        },
        conteudo: null,
      };
    }
  }
}
