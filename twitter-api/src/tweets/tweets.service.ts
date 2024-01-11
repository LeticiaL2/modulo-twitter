import {
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';
import { TweetsRepository } from './tweets.repository';
import { CriarTweetDto } from './dto/criar-tweet.dto';
import { Tweet } from './tweet.entity';
import { EncontrarTweetsParametrosDto } from './dto/encontrar-tweets-parametros.dto';
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

	async encontrarTweetPeloId(idTweet: string): Promise<Tweet> {
		const tweet = await this.tweetsRepository.findOne({
			where: { id: idTweet },
		});
		if (!tweet) throw new NotFoundException('Tweet não encontrado');
		return tweet;
	}

	async deletarTweet(idTweet: string, usuarioId: string) {
		const tweet = await this.encontrarTweetPeloId(idTweet);

		if (tweet.usuarioId !== usuarioId) throw new UnauthorizedException();
		const resultado = await this.tweetsRepository.delete({ id: idTweet });
		if (resultado.affected === 0) throw new NotFoundException();
	}

	async encontrarTweets(consultaDto: EncontrarTweetsParametrosDto): Promise<{
		tweets: Tweet[];
		total: number;
		paginas: number;
		paginaAtual: number;
	}> {
		consultaDto.pagina =
			consultaDto.pagina === undefined || consultaDto.pagina < 1
				? 1
				: consultaDto.pagina;
		consultaDto.limite =
			consultaDto.limite === undefined || consultaDto.limite > 100
				? 100
				: consultaDto.limite;
		const tweetsEncontrados =
			await this.tweetsRepository.encontrarTweets(consultaDto);

		const { tweets, total } = tweetsEncontrados;

		const paginas = Math.ceil(total / consultaDto.limite);

		const paginaAtual = Number(consultaDto.pagina);

		return { tweets, total, paginas, paginaAtual };
	}
}
