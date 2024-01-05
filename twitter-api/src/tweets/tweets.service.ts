import { Injectable } from '@nestjs/common';
import { TweetsRepository } from './tweets.repository';
import { CriarTweetDto } from './dto/criar-tweet.dto';
import { Tweet } from './tweet.entity';

@Injectable()
export class TweetsService {
	constructor(private tweetsRepository: TweetsRepository) {}

	async criarTweet(
		criarTweetDto: CriarTweetDto,
		idUsuario: string,
	): Promise<Tweet> {
		const tweet = new Tweet();
		tweet.texto = criarTweetDto.texto;
		tweet.usuarioId = idUsuario;
		return this.tweetsRepository.criarTweet(tweet);
	}
}
