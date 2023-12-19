import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Param,
  Delete,
} from '@nestjs/common';
import { TweetsService } from './tweets.service';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { UserFromJwt } from 'src/auth/models/UserFromJwt';
import { TweetResponseDto } from './dto/tweet-response.dto';
import { CreateLikeDto } from './dto/create-like.dto';
import { ResponseModel } from 'src/auth/models/ResponseModels';
import { Like } from './entities/like.entity';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { CreateRetweetDto } from './dto/create-retweet.dto';

@Controller('tweets')
export class TweetsController {
  constructor(private readonly tweetsService: TweetsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Body() createTweetDto: CreateTweetDto,
    @CurrentUser() user: UserFromJwt,
  ) {
    console.log('Usuário autenticado:', user);
    if (!user || !user.id) {
      console.error('Usuário não autenticado ou informações inválidas.');
      return {
        status: false,
        mensagem: {
          codigo: 401,
          texto: 'Usuário não autenticado.',
        },
        conteudo: null,
      };
    }

    return this.tweetsService.create(createTweetDto, user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllTweets(
    @CurrentUser() user: UserFromJwt,
  ): Promise<TweetResponseDto[]> {
    return this.tweetsService.getAllTweets(user.id);
  }

  @Post(':id/likes')
  @UseGuards(JwtAuthGuard)
  async createLike(
    @Param('id') tweetId: string,
    @CurrentUser() user: UserFromJwt,
  ): Promise<ResponseModel<Like | null>> {
    const createLikeDto: CreateLikeDto = {
      tweetId: Number(tweetId),
      usuarioId: user.id,
    };

    return this.tweetsService.createLike(createLikeDto);
  }

  @Post(':id/comentarios')
  @UseGuards(JwtAuthGuard)
  async createComentario(
    @Param('id') tweetPaiId: string,
    @Body() createComentarioDto: CreateComentarioDto,
    @CurrentUser() user: UserFromJwt,
  ): Promise<ResponseModel<CreateComentarioDto | null>> {
    return this.tweetsService.createComentario(
      createComentarioDto,
      user,
      Number(tweetPaiId),
    );
  }

  @Post(':id/retweet')
  @UseGuards(JwtAuthGuard)
  async createRetweet(
    @Param('id') tweetPaiId: string,
    @Body() createRetweetDto: CreateRetweetDto,
    @CurrentUser() user: UserFromJwt,
  ) {
    return this.tweetsService.createRetweet(
      createRetweetDto,
      user,
      Number(tweetPaiId),
    );
  }

  @Get(':id/detalhes')
  async getTweetWithComments(
    @Param('id') tweetId: string,
  ): Promise<ResponseModel<TweetResponseDto | null>> {
    return this.tweetsService.getTweetWithComments(Number(tweetId));
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteTweet(
    @Param('id') tweetId: string,
  ): Promise<ResponseModel<TweetResponseDto | null>> {
    return this.tweetsService.deleteTweet(Number(tweetId));
  }
}
