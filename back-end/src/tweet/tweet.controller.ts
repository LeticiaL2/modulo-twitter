import { Controller, Get, Post, Res, Delete, Param, Body, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Controller('api/tweets')
export class TweetController {
  private tweets: { id: number; message: string; likes: number }[] = [];

  private findTweetById(id: string): { id: number; message: string; likes: number } {
    const tweetId = parseInt(id);
    return this.tweets.find((tweet) => tweet.id === tweetId);
  }

  @Get()
  getAllTweets(): { id: number; message: string }[] {
    return this.tweets;
  }

  @Post()
  createTweet(@Body() tweet: { message: string }, @Res() res: Response): { id: number; message: string; likes: number } {
    const newTweet = {
      id: this.tweets.length + 1,
      message: tweet.message,
      likes: 0,
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
