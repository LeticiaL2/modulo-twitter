import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
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
    profile() {
        return { message: 'Protected Route'};
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Req() req, @Res() res) {
        const tweet = await this.tweetsService.create(req.body, req.user.id);
        res.status(201).json(tweet);
    }

}
