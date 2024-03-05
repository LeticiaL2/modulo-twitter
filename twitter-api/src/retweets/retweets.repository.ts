import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Retweet } from './retweet.entity';

@Injectable()
export class RetweetsRepository extends Repository<Retweet> {
	constructor(private dataSource: DataSource) {
		super(Retweet, dataSource.createEntityManager());
	}

	async criarRetweet(retweet: Retweet): Promise<Retweet> {
		const novoRetweet = this.create(retweet);

		try {
			return await novoRetweet.save();
		} catch (error) {
			throw new InternalServerErrorException();
		}
	}

	async deletarRetweet(retweet: Retweet) {
		return await this.delete({ id: retweet.id });
	}

	retornarRetweetsTotais(idTweet: string) {
		return this.count({ where: { idTweetPai: { id: idTweet } } });
	}
}
