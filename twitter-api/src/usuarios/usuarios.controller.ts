import {
	BadRequestException,
	Body,
	Controller,
	Delete,
	Get,
	NotFoundException,
	Param,
	Patch,
	Post,
	Query,
	UseGuards,
	ValidationPipe,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CriarUsuarioDto } from './dto/criar-usuario.dto';
import { RetornoUsuarioDto } from './dto/retorno-usuario.dto';
import { AlterarUsuarioDto } from './dto/alterar-usuario.dto';
import { EncontrarUsuariosParametrosDto } from './dto/encontrar-usuarios-parametros.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetIdUsuario } from './decorator/get-id-usuario.decorator';
import { AlterarSenhaDto } from './dto/alterar-senha.dto';

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
			status: 201,
		};
	}

	@Get(':id')
	@UseGuards(AuthGuard())
	async encontrarUsuarioPeloId(@Param('id') id): Promise<RetornoUsuarioDto> {
		const usuario = await this.usuariosService.encontrarUsuarioPeloId(id);
		return {
			usuario,
			mensagem: 'Usuario encontrado',
			status: 200,
		};
	}

	@Patch()
	@UseGuards(AuthGuard())
	async alterarUsuario(
		@Body(ValidationPipe) alterarUsuarioDto: AlterarUsuarioDto,
		@GetIdUsuario() id: string,
	) {
		try {
			const usuarioAlterado = await this.usuariosService.alterarUsuario(
				alterarUsuarioDto,
				id,
			);
			return {
				usuarioAlterado,
				mensagem: 'Usuário alterado com sucesso',
				status: 200,
			};
		} catch (error) {
			if (error instanceof NotFoundException) {
				return {
					mensagem: 'Usuário não encontrado',
					status: 404,
				};
			} else {
				return {
					mensagem: 'Erro interno do servidor',
					status: 500,
				};
			}
		}
	}

	@Patch('/alterarsenha')
	@UseGuards(AuthGuard())
	async alterarSenha(
		@Body(ValidationPipe) alterarSenhaDto: AlterarSenhaDto,
		@GetIdUsuario() id: string,
	) {
		try {
			const usuarioAlterado = await this.usuariosService.alterarSenha(
				alterarSenhaDto,
				id,
			);
			return {
				usuarioAlterado,
				mensagem: 'Senha alterada com sucesso',
				status: 200,
			};
		} catch (error) {
			if (error instanceof NotFoundException) {
				return {
					mensagem: 'Usuário não encontrado',
					status: 404,
				};
			} else if (error instanceof BadRequestException) {
				return {
					mensagem: 'As senhas não conferem',
					status: 400,
				};
			} else {
				return {
					mensagem: 'Erro interno do servidor',
					status: 500,
				};
			}
		}
	}

	@Delete()
	@UseGuards(AuthGuard())
	async deletarUsuario(@GetIdUsuario() id: string) {
		await this.usuariosService.deletarUsuario(id);
		return { mensagem: 'Usuário removido com sucesso', status: 200 };
	}

	@Get()
	@UseGuards(AuthGuard())
	async encontrarUsuarios(@Query() consulta: EncontrarUsuariosParametrosDto) {
		const encontrado = await this.usuariosService.encontrarUsuarios(consulta);

		if (encontrado.usuarios.length === 0) {
			return {
				encontrado,
				mensagem: 'Nenhum usuário foi encontrado',
				status: 404,
			};
		}
		return {
			encontrado,
			mensagem: 'Usuários encontrados',
			status: 200,
		};
	}
}
