import { Controller, Get, Post, Res, Delete, Param, Body, HttpStatus, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response, Request} from 'express';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserFromJwt } from 'src/auth/models/UserFromJwt';

@Controller('api/tweets')
export class TweetController {
  private tweets: { id: number; message: string; likes: number }[] = [];

  private findTweetById(id: string): { id: number; message: string; likes: number } {
    const tweetId = parseInt(id);
    return this.tweets.find((tweet) => tweet.id === tweetId);
  }

  private getUserIdFromToken(token: string): number {
    const decoded = this.jwtService.decode(token);
    return decoded.sub; 
  }

  constructor(private readonly jwtService: JwtService) {}
  
  @IsPublic()
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllTweets(@CurrentUser() user: UserFromJwt): Promise<any> {
    return this.tweets;
  }

  @IsPublic()
  @UseGuards(JwtAuthGuard) 
  @Post()
  createTweet(@Body() tweet: { message: string }, @Req() req: Request, @Res() res: Response): { id: number; message: string; likes: number } {
    const token = req.headers.authorization.split(' ')[1]; 
    const userId = this.getUserIdFromToken(token);
    const newTweet = {
      id: this.tweets.length + 1,
      message: tweet.message,
      likes: 0,
      userId,
    };
    this.tweets.push(newTweet);
    res.status(HttpStatus.CREATED).send(); 
    return newTweet;
  }

  @Delete(':id')
  deleteTweet(@Param('id') id: string, @Res() res: Response): void {
    const tweetId = parseInt(id);
    const index = this.tweets.findIndex((tweet) => tweet.id === tweetId);
    this.tweets[index].message = '';
    res.status(HttpStatus.NO_CONTENT).send();
  }


  @Get(':id')
  getTweetById(@Param('id') id: string): { id: number; message: string; likes: number } {
    const tweet = this.findTweetById(id);
    return tweet;
  }

  @Post(':id/like')
  likeTweet(@Param('id') id: string, @Res() res: Response): void{
    const tweet = this.findTweetById(id);
    tweet.likes++;
    res.status(HttpStatus.NO_CONTENT).send();
  }

  @Delete(':id/like')
  unlikeTweet(@Param('id') id: string, @Res() res: Response): void{
    const tweet = this.findTweetById(id);
    tweet.likes--;
    res.status(HttpStatus.NO_CONTENT).send();
  }
}
