import { Controller, Get, Post, Delete, Param, Body, HttpStatus } from '@nestjs/common';

@Controller('api/tweets')
export class TweetController {
  private tweets: { id: number; message: string }[] = [];

  @Get()
  getAllTweets(): { id: number; message: string }[] {
    return this.tweets;
  }

  @Post()
  createTweet(@Body() tweet: { message: string }): { id: number; message: string } {
    const newTweet = {
      id: this.tweets.length + 1,
      message: tweet.message,
    };
    this.tweets.push(newTweet);
    return newTweet;
  }

  @Delete(':id')
  deleteTweet(@Param('id') id: string): HttpStatus {
    const tweetId = parseInt(id);
    const index = this.tweets.findIndex((tweet) => tweet.id === tweetId);

    if (index >= 0) {
      this.tweets[index].message = '';
      return HttpStatus.NO_CONTENT;
    } else {
      throw new Error(`Tweet with id ${tweetId} not found`);
    }
  }
}
