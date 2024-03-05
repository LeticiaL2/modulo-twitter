import {
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';
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

	async encontrarComentarioPeloIdTweet(idTweet: string) {
		const comentario = await this.comentariosRepository.findOne({
			where: { idTweet: { id: idTweet } },
			relations: ['idTweet'],
		});
		return comentario;
	}

	async deletarComentario(idTweet: string, idUsuario: string) {
		const comentario = await this.encontrarComentarioPeloIdTweet(idTweet);
		if (!comentario) throw new NotFoundException();

		if (comentario.idTweet.idUsuario != idUsuario)
			throw new UnauthorizedException();

		const resultado =
			await this.comentariosRepository.deletarComentario(comentario);

		if (resultado.affected === 0) throw new NotFoundException();
	}
}
