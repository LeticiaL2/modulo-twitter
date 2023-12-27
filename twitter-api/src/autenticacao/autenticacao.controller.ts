import {
	Body,
	Controller,
	Get,
	Post,
	UseGuards,
	ValidationPipe,
} from '@nestjs/common';
import { AutenticacaoService } from './autenticacao.service';
import { CredenciaisDto } from './credenciais.dto';
import { Usuario } from 'src/usuarios/usuario.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUsuario } from './get-usuario.decorator';

@Controller('autenticacao')
export class AutenticacaoController {
	constructor(private autenticacaoService: AutenticacaoService) {}

	@Post('/entrar')
	async entrar(
		@Body(ValidationPipe) credenciaisDto: CredenciaisDto,
	): Promise<{ token: string }> {
		return await this.autenticacaoService.entrar(credenciaisDto);
	}

	@Get('/me')
	@UseGuards(AuthGuard())
	getMe(@GetUsuario() usuario: Usuario): Usuario {
		return usuario;
	}
}
