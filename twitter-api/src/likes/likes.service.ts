import {
	ConflictException,
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';
import { LikesRepository } from './likes.repository';
import { Like } from './like.entity';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { TweetsService } from 'src/tweets/tweets.service';

@Injectable()
export class LikesService {
	constructor(
		private likesRepository: LikesRepository,
		private usuariosService: UsuariosService,
		private tweetsService: TweetsService,
	) {}

	async curtirTweet(tweetId: string, usuarioId: string): Promise<boolean> {
		const like = new Like();

		const existente = await this.encontrarLikePelotweetId(tweetId, usuarioId);

		if (existente) {
			throw new ConflictException();
		}

		like.usuarioId = await this.usuariosService.encontrarUsuarioPeloId(usuarioId);
		like.tweetId = await this.tweetsService.encontrarTweetPeloId(tweetId);
		return this.likesRepository.curtirTweet(like);
	}

	async descurtirTweet(tweetId: string, usuarioId: string) {
		const like = await this.encontrarLikePelotweetId(tweetId, usuarioId);

		if (!like) throw new NotFoundException();

		if (like.usuarioId.id !== usuarioId) throw new UnauthorizedException();
		const resultado = await this.likesRepository.delete({ id: like.id });
		if (resultado.affected === 0) throw new NotFoundException();
	}

	async encontrarLikePelotweetId(tweetId: string, usuarioId: string) {
		const like = await this.likesRepository.findOne({
			where: { tweetId: { id: tweetId }, usuarioId: { id: usuarioId } },
			relations: ['tweetId', 'usuarioId'],
		});
		return like;
	}
}
