import {
	BadRequestException,
	Body,
	ConflictException,
	Controller,
	Delete,
	Get,
	HttpStatus,
	NotFoundException,
	Param,
	Patch,
	Post,
	Query,
	Res,
	UseGuards,
	ValidationPipe,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CriarUsuarioDto } from './dto/criar-usuario.dto';
import { AlterarUsuarioDto } from './dto/alterar-usuario.dto';
import { EncontrarUsuariosParametrosDto } from './dto/encontrar-usuarios-parametros.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetIdUsuario } from './decorator/get-id-usuario.decorator';
import { AlterarSenhaDto } from './dto/alterar-senha.dto';
import { Response } from 'express';

@Controller('usuarios')
export class UsuariosController {
	constructor(private usuariosService: UsuariosService) {}

	@Post()
	async criarUsuario(
		@Body(ValidationPipe) criarUsuarioDto: CriarUsuarioDto,
		@Res() res: Response,
	): Promise<Response> {
		try {
			const usuario = await this.usuariosService.criarUsuario(criarUsuarioDto);
			return res.status(HttpStatus.CREATED).json({
				conteudo: usuario,
				mensagem: {
					codigo: 201,
					texto: 'Usuário criado com sucesso.',
				},
				status: true,
			});
		} catch (error) {
			if (error instanceof ConflictException) {
				return res.status(HttpStatus.CONFLICT).json({
					conteudo: null,
					mensagem: {
						codigo: 409,
						texto: 'Endereço de email já está em uso',
					},
					status: false,
				});
			} else {
				return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
					conteudo: null,
					mensagem: {
						codigo: 500,
						texto: 'Erro interno do servidor',
					},
					status: false,
				});
			}
		}
	}

	@Patch()
	@UseGuards(AuthGuard())
	async alterarUsuario(
		@Body(ValidationPipe) alterarUsuarioDto: AlterarUsuarioDto,
		@GetIdUsuario() id: string,
		@Res() res: Response,
	) {
		try {
			const usuarioAlterado = await this.usuariosService.alterarUsuario(
				alterarUsuarioDto,
				id,
			);
			return res.status(HttpStatus.OK).json({
				conteudo: usuarioAlterado,
				mensagem: {
					codigo: 200,
					texto: 'Usuário alterado com sucesso',
				},
				status: true,
			});
		} catch (error) {
			if (error instanceof NotFoundException) {
				return res.status(HttpStatus.NOT_FOUND).json({
					conteudo: null,
					mensagem: {
						codigo: 404,
						texto: 'Usuário não encontrado',
					},
					status: false,
				});
			} else {
				return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
					conteudo: null,
					mensagem: {
						codigo: 500,
						texto: 'Erro interno do servidor',
					},
					status: false,
				});
			}
		}
	}

	@Patch('/alterarsenha')
	@UseGuards(AuthGuard())
	async alterarSenha(
		@Body(ValidationPipe) alterarSenhaDto: AlterarSenhaDto,
		@GetIdUsuario() id: string,
		@Res() res: Response,
	) {
		try {
			const usuarioAlterado = await this.usuariosService.alterarSenha(
				alterarSenhaDto,
				id,
			);

			return res.status(HttpStatus.OK).json({
				conteudo: usuarioAlterado,
				mensagem: {
					codigo: 200,
					texto: 'Senha alterada com sucesso',
				},
				status: true,
			});
		} catch (error) {
			if (error instanceof NotFoundException) {
				return res.status(HttpStatus.NOT_FOUND).json({
					conteudo: null,
					mensagem: {
						codigo: 404,
						texto: 'Usuário não encontrado',
					},
					status: false,
				});
			} else if (error instanceof BadRequestException) {
				return res.status(HttpStatus.BAD_REQUEST).json({
					conteudo: null,
					mensagem: {
						codigo: 400,
						texto: 'As senhas não conferem',
					},
					status: false,
				});
			} else {
				return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
					conteudo: null,
					mensagem: {
						codigo: 500,
						texto: 'Erro interno do servidor',
					},
					status: false,
				});
			}
		}
	}

	@Delete()
	@UseGuards(AuthGuard())
	async deletarUsuario(@GetIdUsuario() id: string, @Res() res: Response) {
		try {
			await this.usuariosService.deletarUsuario(id);

			return res.status(HttpStatus.OK).json({
				conteudo: null,
				mensagem: {
					codigo: 200,
					texto: 'Usuário removido com sucesso',
				},
				status: true,
			});
		} catch (error) {
			if (error instanceof NotFoundException) {
				return res.status(HttpStatus.NOT_FOUND).json({
					conteudo: null,
					mensagem: {
						codigo: 404,
						texto: 'Usuario não encontrado',
					},
					status: false,
				});
			} else {
				return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
					conteudo: null,
					mensagem: {
						codigo: 500,
						texto: 'Erro interno do servidor',
					},
					status: false,
				});
			}
		}
	}

	@Get()
	@UseGuards(AuthGuard())
	async encontrarUsuarios(
		@Query() consulta: EncontrarUsuariosParametrosDto,
		@Res() res: Response,
	) {
		try {
			const encontrado = await this.usuariosService.encontrarUsuarios(consulta);

			if (encontrado.usuarios.length === 0) {
				return res.status(HttpStatus.NOT_FOUND).json({
					conteudo: encontrado,
					mensagem: {
						codigo: 404,
						texto: 'Nenhum usuário foi encontrado',
					},
					status: false,
				});
			}
			return res.status(HttpStatus.OK).json({
				conteudo: encontrado,
				mensagem: {
					codigo: 200,
					texto: 'Usuários encontrados',
				},
				status: true,
			});
		} catch (error) {
			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
				conteudo: null,
				mensagem: {
					codigo: 500,
					texto: 'Erro interno do servidor',
				},
				status: false,
			});
		}
	}

	@Get('/confirmar-email/:token')
	async confirmarEmail(
		@Param('token') token: string,
		@Res() res: Response,
	): Promise<any> {
		try {
			await this.usuariosService.confirmarEmail(token);
			return res.status(HttpStatus.OK).json({
				conteudo: null,
				mensagem: {
					codigo: 200,
					texto: 'Email confirmado',
				},
				status: false,
			});
		} catch (error) {
			if (error instanceof NotFoundException) {
				return res.status(HttpStatus.NOT_FOUND).json({
					conteudo: null,
					mensagem: {
						codigo: 404,
						texto: 'Token não encontrado ou expirado',
					},
					status: false,
				});
			}
			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
				conteudo: null,
				mensagem: {
					codigo: 500,
					texto: 'Erro interno do servidor',
				},
				status: false,
			});
		}
	}
}
