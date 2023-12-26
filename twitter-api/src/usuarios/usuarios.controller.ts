import { Body, Controller, Post } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CriarUsuarioDto } from './criar-usuario.dto';
import { RetornoUsuarioDto } from './retorno-usuario.dto';

@Controller('usuarios')
export class UsuariosController {
	constructor(private usuariosService: UsuariosService) {}

	@Post()
	async criarUsuario(
		@Body() criarUsuarioDto: CriarUsuarioDto,
	): Promise<RetornoUsuarioDto> {
		const usuario = await this.usuariosService.criarUsuario(criarUsuarioDto);
		return {
			usuario,
			mensagem: 'Usuário criado com sucesso.',
		};
	}
}
