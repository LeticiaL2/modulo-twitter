import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Comentario } from './comentario.entity';

@Injectable()
export class ComentariosRepository extends Repository<Comentario> {
	constructor(private dataSource: DataSource) {
		super(Comentario, dataSource.createEntityManager());
	}

	async criarComentario(comentario: Comentario): Promise<Comentario> {
		const novoComentario = this.create(comentario);

		try {
			return await novoComentario.save();
		} catch (error) {
			throw new InternalServerErrorException();
		}
	}

	async deletarComentario(comentario: Comentario) {
		return await this.delete({ id: comentario.id });
	}

	retornarComentariosTotais(idTweet: string) {
		return this.count({ where: { idTweetPai: { id: idTweet } } });
	}
}
