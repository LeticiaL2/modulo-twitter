import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { TweetsService } from './tweets.service';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { UserFromJwt } from 'src/auth/models/UserFromJwt';

@Controller('tweets')
export class TweetsController {
  constructor(private readonly tweetsService: TweetsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Body() createTweetDto: CreateTweetDto,
    @CurrentUser() user: UserFromJwt,
  ) {
    return this.tweetsService.create(createTweetDto, user);
  }
}
