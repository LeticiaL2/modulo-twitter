import { Module } from '@nestjs/common';
import { TweetsController } from './tweets.controller';
import { TweetsService } from './tweets.service';
import { Tweet } from './tweet.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TweetsRepository } from './tweets.repository';
import { PassportModule } from '@nestjs/passport';

@Module({
	imports: [
		TypeOrmModule.forFeature([Tweet]),
		PassportModule.register({ defaultStrategy: 'jwt' }),
	],
	controllers: [TweetsController],
	providers: [TweetsService, TweetsRepository],
})
export class TweetsModule {}
