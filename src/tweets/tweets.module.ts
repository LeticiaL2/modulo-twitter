import { Module } from '@nestjs/common';
import { TweetsController } from './tweets.controller';
import { TweetsService } from './tweets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tweet } from './entity/tweet.entity';
import { User } from 'src/users/entity/user.entity';
import { Like } from './entity/like.entity';
import { Comment } from './entity/comment.entity';
import { Retweet } from './entity/retweet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tweet, User, Like, Comment, Retweet])],
  controllers: [TweetsController],
  providers: [TweetsService]
})
export class TweetsModule {}
