import { Controller, Delete, Get, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { TweetsService } from './tweets.service';
import { request } from 'http';


@Controller('api/v1/tweets')
export class TweetsController {
    constructor(private readonly tweetsService: TweetsService) {}


    @UseGuards(JwtAuthGuard)
    @Get()
    async getTweets(@Res() res) {
        const tweets = await this.tweetsService.getTweets();
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
    async deleteTweet(@Param('id') id: number, @Req() req, @Res() res){
        const result = await this.tweetsService.deleteTweet(id, req.user.id);
        res.status(200).json(result);
    }

}
