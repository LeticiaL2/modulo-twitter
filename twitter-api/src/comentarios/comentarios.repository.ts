import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Comentario } from './comentario.entity';

@Injectable()
export class ComentariosRepository extends Repository<Comentario> {
	retornarComentariosTotais(idTweet: string) {
		return this.count({ where: { idTweet: { id: idTweet } } });
	}
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
}
