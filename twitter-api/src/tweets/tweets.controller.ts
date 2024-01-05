import {
	Body,
	Controller,
	Post,
	UseGuards,
	ValidationPipe,
} from '@nestjs/common';
import { TweetsService } from './tweets.service';
import { CriarTweetDto } from './dto/criar-tweet.dto';
import { RetornoTweetDto } from './dto/retorno-tweet.dto';
import { GetIdUsuario } from 'src/usuarios/decorator/get-id-usuario.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('tweets')
export class TweetsController {
	constructor(private tweetsService: TweetsService) {}

	@Post()
	@UseGuards(AuthGuard())
	async criarTweet(
		@Body(ValidationPipe) criarTweetDto: CriarTweetDto,
		@GetIdUsuario() idUsuario: string,
	): Promise<RetornoTweetDto> {
		try {
			const tweet = await this.tweetsService.criarTweet(criarTweetDto, idUsuario);
			return {
				conteudo: tweet,
				mensagem: {
					codigo: 201,
					texto: 'Tweet criado com sucesso.',
				},
				status: true,
			};
		} catch (error) {
			return {
				conteudo: null,
				mensagem: {
					codigo: 500,
					texto: 'Erro interno do servidor',
				},
				status: false,
			};
		}
	}
}
