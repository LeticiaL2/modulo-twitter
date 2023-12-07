import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DbModule } from './db/db.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [UsersModule, DbModule, AuthModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}
