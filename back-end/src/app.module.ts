import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './health/health.controller';
import { TweetController } from './tweet/tweet.controller';
import { UserController } from './user/user.controller';
import { LoginController } from './login/login.controller';

@Module({
  imports: [],
  controllers: [AppController, HealthController, TweetController, UserController, LoginController],
  providers: [AppService],
})
export class AppModule {}
