import {
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';
import { RetweetsRepository } from './retweets.repository';
import { Retweet } from './retweet.entity';
import { Tweet } from 'src/tweets/tweet.entity';

@Injectable()
export class RetweetsService {
	constructor(private retweetsRepository: RetweetsRepository) {}

	async retweetar(tweetPai: Tweet, tweet: Tweet) {
		if (!tweetPai) throw new NotFoundException();

		const retweet = new Retweet();
		retweet.idTweet = tweet;
		retweet.idTweetPai = tweetPai;

		const resultado = await this.retweetsRepository.criarRetweet(retweet);
		return resultado;
	}

	async retornarRetweetsTotais(idTweet: string) {
		return this.retweetsRepository.retornarRetweetsTotais(idTweet);
	}

	async encontrarRetweetPeloIdTweet(idTweet: string) {
		const retweet = await this.retweetsRepository.findOne({
			where: { idTweet: { id: idTweet } },
			relations: ['idTweet'],
		});
		return retweet;
	}

	async encontrarRetweetPeloIdTweetPai(idPai: string, idUsuario: string) {
		const retweet = await this.retweetsRepository
			.createQueryBuilder('retweet')
			.leftJoinAndSelect('retweet.idTweet', 'tweet')
			.leftJoinAndSelect('tweet.usuario', 'usuario')
			.where('retweet.idTweetPai = :idPai', { idPai })
			.andWhere('usuario.id = :idUsuario', { idUsuario })
			.getOne();

		return retweet;
	}

	async deletarRetweet(idTweet: string, idUsuario: string) {
		const retweet = await this.encontrarRetweetPeloIdTweet(idTweet);
		if (!retweet) throw new NotFoundException();

		if (retweet.idTweet.idUsuario != idUsuario) throw new UnauthorizedException();

		const resultado = await this.retweetsRepository.deletarRetweet(retweet);

		if (resultado.affected === 0) throw new NotFoundException();
	}
}
