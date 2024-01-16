import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesRepository } from './likes.repository';
import { TweetsService } from 'src/tweets/tweets.service';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { TweetsRepository } from 'src/tweets/tweets.repository';
import { UsuariosRepository } from 'src/usuarios/usuarios.repository';

@Module({
	providers: [
		LikesService,
		LikesRepository,
		TweetsService,
		TweetsRepository,
		UsuariosService,
		UsuariosRepository,
	],
})
export class LikesModule {}
