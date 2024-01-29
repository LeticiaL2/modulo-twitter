import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './health/health.controller';
import { TweetController } from './tweet/tweet.controller';

@Module({
  imports: [],
  controllers: [AppController, HealthController, TweetController],
  providers: [AppService],
})
export class AppModule {}
