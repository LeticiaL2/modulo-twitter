import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuariosRepository } from 'src/usuarios/usuarios.repository';
import { CredenciaisDto } from './credenciais.dto';
import { JwtService } from '@nestjs/jwt';
import { format } from 'date-fns-tz';

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
			nome: usuario.nome,
			usuario: usuario.usuario,
		};

		const token = await this.jwtService.sign(jwtPayload);
		const expiraEm = this.calcularDataExpiracaoDoToken(token);
		return { token, expiraEm: expiraEm };
	}

	private calcularDataExpiracaoDoToken(token: string): string {
		const decodedToken: any = this.jwtService.decode(token, { json: true });

		if (decodedToken && decodedToken.exp) {
			const expiraEmMillis =
				decodedToken.exp > Date.now() / 1000
					? decodedToken.exp * 1000
					: decodedToken.exp * 1000;

			const expiraEmDate = new Date(expiraEmMillis);

			const expiraEmBrasil = format(expiraEmDate, 'dd-MM-yyyy HH:mm:ss', {
				timeZone: 'America/Sao_Paulo',
			});

			return expiraEmBrasil;
		}

		return null;
	}
}
