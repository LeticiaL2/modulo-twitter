import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuariosRepository } from 'src/usuarios/usuarios.repository';
import { CredenciaisDto } from './credenciais.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AutenticacaoService {
	constructor(
		private usuariosRepository: UsuariosRepository,
		private jwtService: JwtService,
	) {}

	async entrar(credenciaisDto: CredenciaisDto) {
		const usuario =
			await this.usuariosRepository.checarCredenciais(credenciaisDto);

		if (usuario === null) {
			throw new UnauthorizedException('Credenciais inválidas');
		}

		const jwtPayload = {
			id: usuario.id,
		};

		const token = await this.jwtService.sign(jwtPayload);
		return { token };
	}
}
