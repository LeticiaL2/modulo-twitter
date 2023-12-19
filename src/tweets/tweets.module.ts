import { Module } from '@nestjs/common';
import { TweetsController } from './tweets.controller';
import { TweetsService } from './tweets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tweets } from './entity/tweets.entity';
import { Users } from 'src/users/entity/users.entity';
import { Likes } from './entity/likes.entity';
import { Comments } from './entity/comments.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tweets, Users, Likes, Comments])],
  controllers: [TweetsController],
  providers: [TweetsService]
})
export class TweetsModule {}
