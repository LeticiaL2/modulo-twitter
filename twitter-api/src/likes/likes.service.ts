import {
	ConflictException,
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';
import { LikesRepository } from './likes.repository';
import { Like } from './like.entity';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { Tweet } from 'src/tweets/tweet.entity';

@Injectable()
export class LikesService {
	constructor(
		private likesRepository: LikesRepository,
		private usuariosService: UsuariosService,
	) {}

	async curtirTweet(tweet: Tweet, idUsuario: string): Promise<boolean> {
		const like = new Like();

		const existente = await this.encontrarLikePeloIdTweet(tweet.id, idUsuario);

		if (existente) {
			throw new ConflictException();
		}

		like.idUsuario = await this.usuariosService.encontrarUsuarioPeloId(idUsuario);
		like.idTweet = tweet;
		return this.likesRepository.curtirTweet(like);
	}

	async descurtirTweet(idTweet: string, idUsuario: string) {
		const like = await this.encontrarLikePeloIdTweet(idTweet, idUsuario);

		if (!like) throw new NotFoundException();

		if (like.idUsuario.id !== idUsuario) throw new UnauthorizedException();
		const resultado = await this.likesRepository.delete({ id: like.id });
		if (resultado.affected === 0) throw new NotFoundException();
	}

	async encontrarLikePeloIdTweet(idTweet: string, idUsuario: string) {
		const like = await this.likesRepository.findOne({
			where: { idTweet: { id: idTweet }, idUsuario: { id: idUsuario } },
			relations: ['idTweet', 'idUsuario'],
		});
		return like;
	}

	async retornarLikesTotais(idTweet: string) {
		return this.likesRepository.retornarLikesTotais(idTweet);
	}
}
