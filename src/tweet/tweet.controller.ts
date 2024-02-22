import { Controller, Get, Post, Res, Delete, Param, Body, HttpStatus, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { Response, Request} from 'express';
import { AuthService } from 'src/auth/auth.service';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { TweetService } from './tweet.service';

@Controller('api/tweets')
export class TweetController {
  constructor(
    private readonly authService: AuthService,
    private readonly tweetService: TweetService
  ) {}

  @IsPublic()
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllTweets(): Promise<any> {
    return this.tweetService.getAllTweets();
  }

  @IsPublic()
  @UseGuards(JwtAuthGuard) 
  @Post()
  async createTweet(@Body() tweet: { message: string }, @Req() req: Request, @Res() res: Response): Promise<any> {
    const token = req.headers.authorization.split(' ')[1]; 
    const userId = this.authService.getUserIdFromToken(token);
    const newTweet = await this.tweetService.createTweet(tweet.message, userId);
    res.status(HttpStatus.CREATED).send(newTweet); 
  }

  @IsPublic()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteTweet(@Param('id') id: string, @Res() res: Response): Promise<any> {
    await this.tweetService.deleteTweet(parseInt(id));
    res.status(HttpStatus.NO_CONTENT).send();
  }

  @IsPublic()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getTweetById(@Param('id') id: string): Promise<any> {
    return this.tweetService.getTweetById(parseInt(id));
  }

  @IsPublic()
  @UseGuards(JwtAuthGuard)
  @Post(':id/like')
  async likeTweet(@Param('id') id: string, @Res() res: Response): Promise<any> {
    await this.tweetService.likeTweet(parseInt(id));
    res.status(HttpStatus.NO_CONTENT).send();
  }

  @IsPublic()
  @UseGuards(JwtAuthGuard)
  @Delete(':id/like')
  async unlikeTweet(@Param('id') id: string, @Res() res: Response): Promise<any> {
    await this.tweetService.unlikeTweet(parseInt(id));
    res.status(HttpStatus.NO_CONTENT).send();
  }

  @IsPublic()
  @UseGuards(JwtAuthGuard)
  @Post(':id/retweet')
  async retweetTweet(@Param('id') id: string, @Body() tweet: { message: string }, @Req() req: Request, @Res() res: Response): Promise<any> {
    const token = req.headers.authorization.split(' ')[1]; 
    const userId = this.authService.getUserIdFromToken(token);
    const retweet = await this.tweetService.retweetTweet(tweet.message, userId, parseInt(id));
    res.status(HttpStatus.CREATED).send(retweet);
  }
}
