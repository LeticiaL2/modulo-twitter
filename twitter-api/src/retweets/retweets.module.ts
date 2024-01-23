import { Module } from '@nestjs/common';
import { RetweetsService } from './retweets.service';
import { RetweetsRepository } from './retweets.repository';

@Module({
	providers: [RetweetsService, RetweetsRepository],
})
export class RetweetsModule {}
