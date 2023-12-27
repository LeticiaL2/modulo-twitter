import { UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuariosRepository } from 'src/usuarios/usuarios.repository';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtEstrategia extends PassportStrategy(Strategy) {
	constructor(
		@InjectRepository(UsuariosRepository)
		private usuariosRepository: UsuariosRepository,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: 'super-secret',
		});
	}

	async validate(payload: { id: string }) {
		const { id } = payload;
		const usuario = await this.usuariosRepository.findOne({
			where: { id: id },
			select: ['email', 'nome', 'usuario', 'id'],
		});

		if (!usuario) {
			throw new UnauthorizedException('Usuário não encontrado');
		}

		return usuario;
	}
}
