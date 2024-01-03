import { Module } from '@nestjs/common';
import { AutenticacaoController } from './autenticacao.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/usuarios/usuario.entity';
import { UsuariosRepository } from 'src/usuarios/usuarios.repository';
import { AutenticacaoService } from './autenticacao.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtEstrategia } from './jwt.estrategia';

@Module({
	imports: [
		TypeOrmModule.forFeature([Usuario]),
		PassportModule.register({ defaultStrategy: 'jwt' }),
		JwtModule.register({
			secret: 'super-secret',
			signOptions: {
				expiresIn: 7200,
			},
		}),
	],
	controllers: [AutenticacaoController],
	providers: [UsuariosRepository, AutenticacaoService, JwtEstrategia],
	exports: [JwtEstrategia, PassportModule],
})
export class AutenticacaoModule {}
