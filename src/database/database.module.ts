import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'src/users/entities/users.entity'
import { ConfigService } from '@nestjs/config'
import { Tweet } from 'src/tweets/entities/tweet.entity'
import { Like } from 'src/tweets/entities/likes.entity'
import { Comentario } from 'src/tweets/entities/comentarios.entity'
import { Retweet } from 'src/tweets/entities/retweet.entity'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: configService.get('DB_HOST'),
          port: Number(configService.get('DB_PORT')),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_NAME'),
          entities: [User, Tweet, Like, Comentario, Retweet],
          synchronize: false,
        }
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
