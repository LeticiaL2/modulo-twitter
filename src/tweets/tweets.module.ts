import { Module } from '@nestjs/common'
import { TweetsService } from './tweets.service'
import { TweetsController } from './tweets.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Tweet } from './entities/tweet.entity'
import { User } from 'src/users/entities/users.entity'
import { UsersModule } from 'src/users/users.module'
import { Like } from './entities/likes.entity'
import { Comentario } from './entities/comentarios.entity'
import { Retweet } from './entities/retweet.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Tweet, Like, Comentario, Retweet]),
    UsersModule,
  ],
  controllers: [TweetsController],
  providers: [TweetsService],
  exports: [TweetsService],
})
export class TweetsModule {}
