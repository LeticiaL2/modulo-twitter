import {
	Body,
	ConflictException,
	Controller,
	Delete,
	Get,
	HttpStatus,
	NotFoundException,
	Param,
	Post,
	Query,
	Res,
	UnauthorizedException,
	UseGuards,
	ValidationPipe,
} from '@nestjs/common';
import { TweetsService } from './tweets.service';
import { CriarTweetDto } from './dto/criar-tweet.dto';
import { GetIdUsuario } from 'src/usuarios/decorator/get-id-usuario.decorator';
import { AuthGuard } from '@nestjs/passport';
import { EncontrarTweetsParametrosDto } from './dto/encontrar-tweets-parametros.dto';
import { Response } from 'express';
import { LikesService } from 'src/likes/likes.service';
import { ComentariosService } from 'src/comentarios/comentarios.service';
@Controller('tweets')
export class TweetsController {
	constructor(
		private tweetsService: TweetsService,
		private likesService: LikesService,
		private comentariosService: ComentariosService,
	) {}

	@Post()
	@UseGuards(AuthGuard())
	async criarTweet(
		@Body(ValidationPipe) criarTweetDto: CriarTweetDto,
		@GetIdUsuario() idUsuario: string,
		@Res() res: Response,
	): Promise<Response> {
		try {
			const tweet = await this.tweetsService.criarTweet(criarTweetDto, idUsuario);

			return res.status(HttpStatus.CREATED).json({
				conteudo: tweet,
				mensagem: {
					codigo: 201,
					texto: 'Tweet criado com sucesso.',
				},
				status: true,
			});
		} catch (error) {
			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
				conteudo: null,
				mensagem: {
					codigo: 500,
					texto: 'Erro interno do servidor',
				},
				status: false,
			});
		}
	}

	@Delete(':id')
	@UseGuards(AuthGuard())
	async deletarUsuario(
		@GetIdUsuario() idUsuario: string,
		@Param('id') id: string,
		@Res() res: Response,
	) {
		try {
			await this.tweetsService.deletarTweet(id, idUsuario);
			return res.status(HttpStatus.OK).json({
				conteudo: null,
				mensagem: {
					codigo: 200,
					texto: 'Tweet removido com sucesso',
				},
				status: true,
			});
		} catch (error) {
			if (error instanceof NotFoundException) {
				return res.status(HttpStatus.NOT_FOUND).json({
					conteudo: null,
					mensagem: {
						codigo: 404,
						texto: 'Tweet não encontrado',
					},
					status: false,
				});
			} else if (error instanceof UnauthorizedException) {
				return res.status(HttpStatus.UNAUTHORIZED).json({
					conteudo: null,
					mensagem: {
						codigo: 401,
						texto: 'Você não tem autorização para excluir esse tweet',
					},
					status: false,
				});
			} else {
				return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
					conteudo: null,
					mensagem: {
						codigo: 500,
						texto: 'Erro interno do servidor',
					},
					status: false,
				});
			}
		}
	}

	@Get()
	@UseGuards(AuthGuard())
	async encontrarTweets(
		@Query() consulta: EncontrarTweetsParametrosDto,
		@Res() res: Response,
	) {
		try {
			const encontrado = await this.tweetsService.encontrarTweets(consulta);

			if (encontrado.tweets.length === 0) {
				return res.status(HttpStatus.NOT_FOUND).json({
					conteudo: encontrado,
					mensagem: {
						codigo: 404,
						texto: 'Nenhum tweet foi encontrado',
					},
					status: false,
				});
			}
			return res.status(HttpStatus.OK).json({
				conteudo: encontrado,
				mensagem: {
					codigo: 200,
					texto: 'Tweets encontrados',
				},
				status: true,
			});
		} catch (error) {
			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
				conteudo: null,
				mensagem: {
					codigo: 500,
					texto: 'Erro interno do servidor',
				},
				status: false,
			});
		}
	}

	@Post(':id/likes')
	@UseGuards(AuthGuard())
	async curtirTweet(
		@Param('id') idTweet: string,
		@GetIdUsuario() idUsuario: string,
		@Res() res: Response,
	) {
		try {
			const curtiu = await this.likesService.curtirTweet(idTweet, idUsuario);

			return res.status(HttpStatus.OK).json({
				conteudo: curtiu,
				mensagem: {
					codigo: 200,
					texto: 'Tweet curtido com sucesso',
				},
				status: true,
			});
		} catch (error) {
			if (error instanceof NotFoundException) {
				return res.status(HttpStatus.NOT_FOUND).json({
					conteudo: false,
					mensagem: {
						codigo: 404,
						texto: 'Tweet ou Usuário não encontrado',
					},
					status: false,
				});
			} else if (error instanceof ConflictException) {
				return res.status(HttpStatus.CONFLICT).json({
					conteudo: false,
					mensagem: {
						codigo: 409,
						texto: 'Esse tweet já foi curtido',
					},
					status: false,
				});
			} else {
				return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
					conteudo: false,
					mensagem: {
						codigo: 500,
						texto: 'Erro interno do servidor',
					},
					status: false,
				});
			}
		}
	}

	@Delete(':id/likes')
	@UseGuards(AuthGuard())
	async descurtirTweet(
		@Param('id') idTweet: string,
		@GetIdUsuario() idUsuario: string,
		@Res() res: Response,
	) {
		try {
			const curtiu = await this.likesService.descurtirTweet(idTweet, idUsuario);

			return res.status(HttpStatus.OK).json({
				conteudo: curtiu,
				mensagem: {
					codigo: 200,
					texto: 'Tweet descurtido com sucesso',
				},
				status: true,
			});
		} catch (error) {
			if (error instanceof NotFoundException) {
				return res.status(HttpStatus.NOT_FOUND).json({
					conteudo: false,
					mensagem: {
						codigo: 404,
						texto: 'Like não encontrado',
					},
					status: false,
				});
			} else if (error instanceof UnauthorizedException) {
				return res.status(HttpStatus.UNAUTHORIZED).json({
					conteudo: false,
					mensagem: {
						codigo: 403,
						texto: 'Não autorizado',
					},
					status: false,
				});
			} else {
				return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
					conteudo: false,
					mensagem: {
						codigo: 500,
						texto: 'Erro interno do servidor',
					},
					status: false,
				});
			}
		}
	}

	@Post(':id/comentarios')
	@UseGuards(AuthGuard())
	async comentar(
		@Body(ValidationPipe) criarTweetDto: CriarTweetDto,
		@Param('id') idTweet: string,
		@GetIdUsuario() idUsuario: string,
		@Res() res: Response,
	) {
		try {
			const tweetPai = await this.tweetsService.encontrarTweetPeloId(idTweet);
			const tweet = await this.tweetsService.criarTweet(criarTweetDto, idUsuario);

			const comentario = await this.comentariosService.comentar(tweetPai, tweet);

			return res.status(HttpStatus.OK).json({
				conteudo: comentario,
				mensagem: {
					codigo: 200,
					texto: 'Comentário criado com sucesso',
				},
				status: true,
			});
		} catch (error) {
			if (error instanceof NotFoundException) {
				return res.status(HttpStatus.NOT_FOUND).json({
					conteudo: false,
					mensagem: {
						codigo: 404,
						texto: 'Tweet não encontrado',
					},
					status: false,
				});
			} else {
				return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
					conteudo: false,
					mensagem: {
						codigo: 500,
						texto: 'Erro interno do servidor',
					},
					status: false,
				});
			}
		}
	}
}
