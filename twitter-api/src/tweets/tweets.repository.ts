import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Tweet } from './tweet.entity';

@Injectable()
export class TweetsRepository extends Repository<Tweet> {
	constructor(private dataSource: DataSource) {
		super(Tweet, dataSource.createEntityManager());
	}

	async criarTweet(tweet: Tweet): Promise<Tweet> {
		const novoTweet = this.create(tweet);

		try {
			await novoTweet.save();
			return novoTweet;
		} catch (error) {
			throw new InternalServerErrorException();
		}
	}
}
