import { Module } from '@nestjs/common';
import { TweetsController } from './tweets.controller';
import { TweetsService } from './tweets.service';
import { Tweet } from './tweet.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TweetsRepository } from './tweets.repository';
import { PassportModule } from '@nestjs/passport';
import { LikesService } from 'src/likes/likes.service';
import { LikesRepository } from 'src/likes/likes.repository';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { UsuariosRepository } from 'src/usuarios/usuarios.repository';

@Module({
	imports: [
		TypeOrmModule.forFeature([Tweet]),
		PassportModule.register({ defaultStrategy: 'jwt' }),
	],
	controllers: [TweetsController],
	providers: [
		TweetsService,
		TweetsRepository,
		LikesService,
		LikesRepository,
		UsuariosService,
		UsuariosRepository,
	],
})
export class TweetsModule {}
