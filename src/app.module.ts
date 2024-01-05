import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DbModule } from './db/db.module';
import { AuthModule } from './auth/auth.module';
import { TweetsModule } from './tweets/tweets.module';

@Module({
  imports: [UsersModule, DbModule, AuthModule, TweetsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
