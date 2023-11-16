// tweets.module.ts
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt'; // Certifique-se de importar o JwtModule
import { TweetsService } from './tweets.service';
import { TweetsController } from './tweets.controller';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({ secret: process.env.JWT_SECRET }),
  ],
  controllers: [TweetsController],
  providers: [TweetsService],
  exports: [TweetsService],
})
export class TweetsModule {}
