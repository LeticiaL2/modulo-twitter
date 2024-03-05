import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
	NotFoundException,
} from '@nestjs/common';
import { UsuariosRepository } from './usuarios.repository';
import { Usuario } from './usuario.entity';
import { CriarUsuarioDto } from './dto/criar-usuario.dto';
import { AlterarUsuarioDto } from './dto/alterar-usuario.dto';
import { EncontrarUsuariosParametrosDto } from './dto/encontrar-usuarios-parametros.dto';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { AlterarSenhaDto } from './dto/alterar-senha.dto';
import * as sgMail from '@sendgrid/mail';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class UsuariosService {
	constructor(private usuariosRepository: UsuariosRepository) {}

	async criarUsuario(criarUsuarioDto: CriarUsuarioDto): Promise<Usuario> {
		const usuario = new Usuario();
		usuario.email = criarUsuarioDto.email;
		usuario.nome = criarUsuarioDto.nome;
		usuario.ativo = true;
		usuario.tokenConfirmacao = crypto.randomBytes(32).toString('hex');
		usuario.salt = await bcrypt.genSalt();
		usuario.senha = await this.encriptarSenha(
			criarUsuarioDto.senha,
			usuario.salt,
		);
		usuario.usuario = criarUsuarioDto.usuario;

		sgMail.setApiKey(process.env.SENDGRID_API_KEY);

		const emailSendgrid = {
			to: 'aryaneladsilva@gmail.com',
			from: 'testeemailary@gmail.com',
			subject: 'Confirme seu email do Twitter',
			text: 'Para confirmar seu email acesse o link: link',
			html:
				'<html><body><center><div style="background-color: #d3d3d3; max-width: 840px; margin: 0; padding: 30px;"><h2 style="color: #292536; text-align: center">Confirme seu endereço de email</h2><p>Para confirmar seu email clique no botão abaixo, ou acesse o seguinte link: </p><div style="margin: 20px auto; width: 180px; padding: 10px 20px; background-color: #442d52; border-radius: 5px; text-align: center;"><a href="http://url-do-front/email-confirmation/?token={{token}}" target="_blank" rel="noopener noreferrer" style="text-decoration: none; color: #fcfcfc; font-size: 18px; margin: 0 auto;">Confirmar Email</a></div></div></center></body></html>',
		};

		try {
			await sgMail.send(emailSendgrid);
		} catch (error) {
			throw new InternalServerErrorException();
		}
		return usuario;
	}

	async encontrarUsuarioPeloId(idUsuario: string): Promise<Usuario> {
		const usuario = await this.usuariosRepository.findOne({
			where: { id: idUsuario },
			select: ['email', 'nome', 'usuario', 'id'],
		});
		if (!usuario) throw new NotFoundException('Usuário não encontrado');
		return usuario;
	}

	async encontrarUsuarioCompletoPeloId(idUsuario: string): Promise<Usuario> {
		const usuario = await this.usuariosRepository.findOne({
			where: { id: idUsuario },
		});
		if (!usuario) throw new NotFoundException('Usuário não encontrado');
		return usuario;
	}

	async alterarUsuario(
		alterarUsuarioDto: AlterarUsuarioDto,
		id: string,
	): Promise<Usuario> {
		const usuarioEncontrado = await this.encontrarUsuarioPeloId(id);
		const { nome, email, usuario, ativo } = alterarUsuarioDto;

		usuarioEncontrado.nome = nome ?? usuarioEncontrado.nome;
		usuarioEncontrado.email = email ?? usuarioEncontrado.email;
		usuarioEncontrado.usuario = usuario ?? usuarioEncontrado.usuario;
		usuarioEncontrado.ativo =
			ativo === undefined ? usuarioEncontrado.ativo : ativo;

		try {
			await usuarioEncontrado.save();
			return usuarioEncontrado;
		} catch (error) {
			throw new InternalServerErrorException(
				'Erro ao salvar novo usuário no banco de dados',
			);
		}
	}

	async alterarSenha(alterarSenhaDto: AlterarSenhaDto, idUsuario: string) {
		const { senha, novaSenha } = alterarSenhaDto;

		const usuario = await this.encontrarUsuarioCompletoPeloId(idUsuario);
		if (!usuario) throw new NotFoundException('Usuário não encontrado.');

		const senhaValida = await bcrypt.compare(senha, usuario.senha);
		if (!senhaValida) throw new BadRequestException('As senhas não conferem');

		usuario.senha = await this.encriptarSenha(novaSenha, usuario.salt);
		const usuarioAlterado = await usuario.save();
		return usuarioAlterado;
	}

	async deletarUsuario(idUsuario: string) {
		const resultado = await this.usuariosRepository.delete({ id: idUsuario });
		if (resultado.affected === 0) throw new NotFoundException();
	}

	async encontrarUsuarios(consultaDto: EncontrarUsuariosParametrosDto): Promise<{
		usuarios: Usuario[];
		total: number;
		paginas: number;
		paginaAtual: number;
	}> {
		consultaDto.ativo =
			consultaDto.ativo === undefined ? true : consultaDto.ativo;
		consultaDto.pagina =
			consultaDto.pagina === undefined || consultaDto.pagina < 1
				? 1
				: consultaDto.pagina;
		consultaDto.limite =
			consultaDto.limite === undefined || consultaDto.limite > 100
				? 100
				: consultaDto.limite;
		const usuariosEncontrados =
			await this.usuariosRepository.encontrarUsuarios(consultaDto);

		const { usuarios, total } = usuariosEncontrados;

		const paginas = Math.ceil(total / consultaDto.limite);

		const paginaAtual = Number(consultaDto.pagina);

		return { usuarios, total, paginas, paginaAtual };
	}

	private async encriptarSenha(senha: string, salt: string): Promise<string> {
		return bcrypt.hash(senha, salt);
	}

	async confirmarEmail(token: string): Promise<void> {
		const usuario = await this.usuariosRepository.findOne({
			where: { tokenConfirmacao: token },
		});
		if (!usuario) {
			throw new NotFoundException();
		}

		usuario.data_ativacao = new Date();
		await this.usuariosRepository.save(usuario);
	}
}
