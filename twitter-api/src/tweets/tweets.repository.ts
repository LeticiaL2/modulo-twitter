import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Tweet } from './tweet.entity';
import { EncontrarTweetsParametrosDto } from './dto/encontrar-tweets-parametros.dto';

@Injectable()
export class TweetsRepository extends Repository<Tweet> {
	constructor(private dataSource: DataSource) {
		super(Tweet, dataSource.createEntityManager());
	}

	async criarTweet(tweet: Tweet): Promise<Tweet> {
		const novoTweet = this.create(tweet);

		try {
			await novoTweet.save();
			return novoTweet;
		} catch (error) {
			throw new InternalServerErrorException();
		}
	}

	async encontrarTweets(
		consultaDto: EncontrarTweetsParametrosDto,
	): Promise<{ tweets: Tweet[]; total: number }> {
		const { id, usuarioId } = consultaDto;
		const consulta = this.createQueryBuilder('tweet');

		if (id) {
			consulta.where('tweet.id = :id', { id });
		}

		if (usuarioId) {
			consulta.andWhere('tweet.usuarioId = :usuarioId', { usuarioId });
		}

		consulta.skip((consultaDto.pagina - 1) * consultaDto.limite);
		consulta.take(+consultaDto.limite);
		const orderColumn = consultaDto.ordenar
			? JSON.parse(consultaDto.ordenar)
			: undefined;
		const orderDirection = consultaDto.ordenarPor
			? consultaDto.ordenarPor
			: 'ASC';

		if (orderColumn !== undefined) {
			consulta.orderBy({
				[orderColumn]: orderDirection,
			});
		}

		consulta.select([
			'tweet.id',
			'tweet.texto',
			'tweet.usuarioId',
			'tweet.data_criacao',
			'tweet.excluido',
		]);

		const [tweets, total] = await consulta.getManyAndCount();

		return { tweets, total };
	}
}
