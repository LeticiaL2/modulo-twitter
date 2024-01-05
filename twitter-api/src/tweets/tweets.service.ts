import { Injectable, NotFoundException } from '@nestjs/common';
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

	async deletarTweet(idTweet: string, idUsuario: string) {
		//todo: comparar ids
		idUsuario;
		const resultado = await this.tweetsRepository.delete({ id: idTweet });
		if (resultado.affected === 0) throw new NotFoundException();
	}
}
