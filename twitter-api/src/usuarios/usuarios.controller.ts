import {
	Body,
	Controller,
	Get,
	Param,
	Patch,
	Post,
	ValidationPipe,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CriarUsuarioDto } from './dto/criar-usuario.dto';
import { RetornoUsuarioDto } from './dto/retorno-usuario.dto';
import { AlterarUsuarioDto } from './dto/alterar-usuario.dto';

@Controller('usuarios')
export class UsuariosController {
	constructor(private usuariosService: UsuariosService) {}

	@Post()
	async criarUsuario(
		@Body(ValidationPipe) criarUsuarioDto: CriarUsuarioDto,
	): Promise<RetornoUsuarioDto> {
		const usuario = await this.usuariosService.criarUsuario(criarUsuarioDto);
		return {
			usuario,
			mensagem: 'Usuário criado com sucesso.',
		};
	}

	@Get(':id')
	async encontrarUsuarioPeloId(@Param('id') id): Promise<RetornoUsuarioDto> {
		const usuario = await this.usuariosService.encontrarUsuarioPeloId(id);
		return {
			usuario,
			mensagem: 'Usuario encontrado',
		};
	}

	@Patch(':id')
	async alterarUsuario(
		@Body(ValidationPipe) alterarUsuarioDto: AlterarUsuarioDto,
		@Param('id') id: string,
	) {
		return this.usuariosService.alterarUsuario(alterarUsuarioDto, id);
	}
}
