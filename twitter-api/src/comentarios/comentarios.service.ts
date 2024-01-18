import { Injectable, NotFoundException } from '@nestjs/common';
import { ComentariosRepository } from './comentarios.repository';
import { Tweet } from 'src/tweets/tweet.entity';
import { Comentario } from './comentario.entity';

@Injectable()
export class ComentariosService {
	constructor(private comentariosRepository: ComentariosRepository) {}
	async comentar(tweetPai: Tweet, tweet: Tweet) {
		if (!tweetPai) throw new NotFoundException();

		const comentario = new Comentario();
		comentario.idTweet = tweet;
		comentario.idTweetPai = tweetPai;

		const resultado =
			await this.comentariosRepository.criarComentario(comentario);
		return resultado;
	}

	async retornarComentariosTotais(idTweet: string) {
		return this.comentariosRepository.retornarComentariosTotais(idTweet);
	}
}
