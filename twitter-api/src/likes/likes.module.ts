import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesRepository } from './likes.repository';
import { TweetsService } from 'src/tweets/tweets.service';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { TweetsRepository } from 'src/tweets/tweets.repository';
import { UsuariosRepository } from 'src/usuarios/usuarios.repository';
import { ComentariosService } from 'src/comentarios/comentarios.service';
import { ComentariosRepository } from 'src/comentarios/comentarios.repository';
import { RetweetsService } from 'src/retweets/retweets.service';
import { RetweetsRepository } from 'src/retweets/retweets.repository';

@Module({
	providers: [
		LikesService,
		LikesRepository,
		TweetsService,
		TweetsRepository,
		UsuariosService,
		UsuariosRepository,
		ComentariosService,
		ComentariosRepository,
		RetweetsService,
		RetweetsRepository,
	],
})
export class LikesModule {}
