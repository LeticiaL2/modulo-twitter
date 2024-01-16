import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Like } from './like.entity';

@Injectable()
export class LikesRepository extends Repository<Like> {
	constructor(private dataSource: DataSource) {
		super(Like, dataSource.createEntityManager());
	}

	async curtirTweet(like: Like): Promise<boolean> {
		const novoLike = this.create(like);

		try {
			await novoLike.save();
			return true;
		} catch (error) {
			throw new InternalServerErrorException();
		}
	}

	async retornarLikesTotais(idTweet: string): Promise<number> {
		return this.count({ where: { idTweet: { id: idTweet } } });
	}
}
