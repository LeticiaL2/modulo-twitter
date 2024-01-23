import {
	Inject,
	Injectable,
	NotFoundException,
	UnauthorizedException,
	forwardRef,
} from '@nestjs/common';
import { TweetsRepository } from './tweets.repository';
import { CriarTweetDto } from './dto/criar-tweet.dto';
import { Tweet } from './tweet.entity';
import { EncontrarTweetsParametrosDto } from './dto/encontrar-tweets-parametros.dto';
import { LikesService } from 'src/likes/likes.service';
import { ComentariosService } from 'src/comentarios/comentarios.service';
import { RetweetsService } from 'src/retweets/retweets.service';
@Injectable()
export class TweetsService {
	constructor(
		private tweetsRepository: TweetsRepository,
		private comentariosService: ComentariosService,
		private retweetsService: RetweetsService,
		@Inject(forwardRef(() => LikesService)) private likesService: LikesService,
	) {}

	async criarTweet(
		criarTweetDto: CriarTweetDto,
		idUsuario: string,
	): Promise<Tweet> {
		const tweet = new Tweet();
		tweet.texto = criarTweetDto.texto;
		tweet.idUsuario = idUsuario;
		return this.tweetsRepository.criarTweet(tweet);
	}

	async encontrarTweetPeloId(idTweet: string): Promise<Tweet> {
		let tweet = await this.tweetsRepository.findOne({
			where: { id: idTweet },
		});
		if (!tweet) throw new NotFoundException('Tweet não encontrado');

		tweet = await this.adicionarLikesNoTweet(tweet);
		return tweet;
	}

	async deletarTweet(idTweet: string, idUsuario: string) {
		const tweet = await this.encontrarTweetPeloId(idTweet);

		if (tweet.idUsuario !== idUsuario) throw new UnauthorizedException();

		await this.tweetsRepository.update({ id: tweet.id }, { excluido: true });
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

		await Promise.all(
			tweets.map(async (tweet) => {
				const tweetComLike = await this.adicionarLikesNoTweet(tweet);
				const tweetComLikeERetweet =
					await this.adicionarRetweetsNoTweet(tweetComLike);
				return await this.adicionarComentariosNoTweet(tweetComLikeERetweet);
			}),
		);

		const paginas = Math.ceil(total / consultaDto.limite);

		const paginaAtual = Number(consultaDto.pagina);

		return { tweets, total, paginas, paginaAtual };
	}

	async adicionarLikesNoTweet(tweet: Tweet) {
		tweet.likes = await this.likesService.retornarLikesTotais(tweet.id);
		return tweet;
	}

	async adicionarComentariosNoTweet(tweet: Tweet) {
		tweet.comentarios = await this.comentariosService.retornarComentariosTotais(
			tweet.id,
		);
		return tweet;
	}

	async adicionarRetweetsNoTweet(tweet: Tweet) {
		tweet.retweets = await this.retweetsService.retornarRetweetsTotais(tweet.id);
		return tweet;
	}
}
