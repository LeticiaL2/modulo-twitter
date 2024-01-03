import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosRepository } from './usuarios.repository';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './usuario.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
	imports: [
		TypeOrmModule.forFeature([Usuario]),
		PassportModule.register({ defaultStrategy: 'jwt' }),
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: 'localhost',
			port: 5432,
			username: 'postgres',
			password: 'admin',
			database: 'twitterdb',
			entities: [__dirname + '/../**/*.entity.{js,ts}'],
			synchronize: true,
			url:
				process.env.DATABASE_URL ||
				'postgresql://postgres:admin@localhost:5432/twitterdb?timezone=Brazil%2FSao_Paulo',
		}),
	],
	providers: [UsuariosService, UsuariosRepository],
	controllers: [UsuariosController],
})
export class UsuariosModule {}
