import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { TweetsService } from './tweets.service';

@Controller('api/v1/tweets')
export class TweetsController {
  constructor(private readonly tweetsService: TweetsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getTweets(@Req() req, @Res() res) {
    const tweets = await this.tweetsService.getTweets(req.user.id);
    res.status(200).json(tweets);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async postTweet(@Req() req, @Res() res) {
    const tweet = await this.tweetsService.postTweet(req.body, req.user.id);
    res.status(201).json(tweet);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteTweet(@Param('id') id: number, @Req() req, @Res() res) {
    const result = await this.tweetsService.deleteTweet(id, req.user.id);
    res.status(200).json(result);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/likes')
  async likeTweet(@Param('id') id: number, @Req() req, @Res() res) {
    const result = await this.tweetsService.likeTweet(id, req.user.id);
    res.status(200).json(result);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id/likes')
  async dislikeTweet(@Param('id') id: number, @Req() req, @Res() res) {
    const result = await this.tweetsService.dislikeTweet(id, req.user.id);
    res.status(200).json(result);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/comentarios')
  async postComment(@Param('id') id: number, @Req() req, @Res() res) {
    const result = await this.tweetsService.postComment(
      id,
      req.body,
      req.user.id,
    );
    res.status(200).json(result);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getTweetDetails(@Param('id') id: number, @Res() res) {
    const result = await this.tweetsService.getTweetDetails(id);
    res.status(200).json(result);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/retweets')
  async retweet(@Param('id') tweetId: number, @Req() req, @Res() res) {
    const result = await this.tweetsService.postRetweet(
      tweetId,
      req.body,
      req.user.id,
    );
    res.status(200).json(result);
  }
}
