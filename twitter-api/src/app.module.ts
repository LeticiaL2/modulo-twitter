import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AutenticacaoModule } from './autenticacao/autenticacao.module';
import { TweetsModule } from './tweets/tweets.module';
import { LikesModule } from './likes/likes.module';
import { ComentariosModule } from './comentarios/comentarios.module';
@Module({
	imports: [
		TypeOrmModule.forRoot(typeOrmConfig),
		UsuariosModule,
		AutenticacaoModule,
		TweetsModule,
		LikesModule,
		ComentariosModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
