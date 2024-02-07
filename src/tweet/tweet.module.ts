import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TweetController } from './tweet.controller';
import { TweetService } from './tweet.service';

@Module({imports: [PrismaModule, JwtModule.register({secret:process.env.JWT_SECRET})],
controllers: [TweetController],
providers: [TweetService],}
)
export class TweetModule {
}
