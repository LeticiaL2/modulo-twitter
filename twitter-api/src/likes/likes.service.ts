import {
	ConflictException,
	Inject,
	Injectable,
	NotFoundException,
	UnauthorizedException,
	forwardRef,
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
		@Inject(forwardRef(() => TweetsService)) private tweetsService: TweetsService,
	) {}

	async curtirTweet(idTweet: string, idUsuario: string): Promise<boolean> {
		const like = new Like();

		const existente = await this.encontrarLikePeloIdTweet(idTweet, idUsuario);

		if (existente) {
			throw new ConflictException();
		}

		like.idUsuario = await this.usuariosService.encontrarUsuarioPeloId(idUsuario);
		like.idTweet = await this.tweetsService.encontrarTweetPeloId(idTweet);
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
