import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { AuthRequest } from 'src/auth/dto/AuthRequest'
import { JwtAuthGuard } from 'src/auth/guards/guardjwt-strategy'
import { ApiResponseCustom, ApiResponseCustomList } from 'src/utils/decorators'
import { CreateTweetDTO } from './dto/create-tweet.dto'
import { TweetsService } from './tweets.service'
import { ResponseListModel, ResponseModel } from 'src/utils/models'
import { ResponseCreateTweetDTO } from './dto/response-tweet.dto'

@ApiTags('tweets')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('api/v1/tweets')
export class TweetsController {
  constructor(private readonly tweetsService: TweetsService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um tweet' })
  @ApiResponseCustom(ResponseModel, ResponseCreateTweetDTO, 201)
  createTweet(
    @Body() createTweetDTO: CreateTweetDTO,
    @Request() req: AuthRequest,
  ) {
    return this.tweetsService.createTweet(createTweetDTO, req.user)
  }

  @Post(':id/comentarios')
  @ApiOperation({ summary: 'Cria um comentário' })
  @ApiResponseCustom(ResponseModel, ResponseCreateTweetDTO, 201)
  comentario(
    @Param('id') tweetPaiId: string,
    @Body() createTweetDTO: CreateTweetDTO,
    @Request() req: AuthRequest,
  ) {
    return this.tweetsService.createComentario(
      createTweetDTO,
      tweetPaiId,
      req.user,
    )
  }

  @Post(':id/likes')
  @ApiOperation({ summary: 'Cria um like' })
  @ApiResponseCustom(ResponseModel, ResponseCreateTweetDTO, 201)
  likes(@Param('id') tweetId: string, @Request() req: AuthRequest) {
    return this.tweetsService.toggleLike(tweetId, req.user)
  }

  @Post(':id/retweets')
  @ApiOperation({ summary: 'Cria um retweet' })
  @ApiResponseCustom(ResponseModel, ResponseCreateTweetDTO, 201)
  retweet(
    @Param('id') tweetPaiId: string,
    @Body() createRetweetDTO: CreateTweetDTO,
    @Request() req: AuthRequest,
  ) {
    return this.tweetsService.createRetweet(
      createRetweetDTO,
      tweetPaiId,
      req.user,
    )
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os tweets' })
  @ApiResponseCustomList(ResponseListModel, ResponseCreateTweetDTO, 200)
  findAll(@Request() req: AuthRequest) {
    return this.tweetsService.findAll(req.user)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca um tweet' })
  @ApiResponseCustom(ResponseModel, ResponseCreateTweetDTO, 200)
  findOne(@Param('id') tweetId: string, @Request() req: AuthRequest) {
    return this.tweetsService.findOne(tweetId, req.user)
  }

  @Delete(':id/delete')
  delete(@Param('id') tweetId: string, @Request() req: AuthRequest) {
    return this.tweetsService.deleteTweet(tweetId, req.user)
  }
}
