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
import { AlterarSenhaDto } from './dto/alterar-senha.dto';

@Injectable()
export class UsuariosService {
	constructor(private usuariosRepository: UsuariosRepository) {}

	async criarUsuario(criarUsuarioDto: CriarUsuarioDto): Promise<Usuario> {
		const usuario = new Usuario();
		usuario.email = criarUsuarioDto.email;
		usuario.nome = criarUsuarioDto.nome;
		usuario.ativo = true;
		usuario.salt = await bcrypt.genSalt();
		usuario.senha = await this.encriptarSenha(
			criarUsuarioDto.senha,
			usuario.salt,
		);
		usuario.usuario = criarUsuarioDto.usuario;
		return this.usuariosRepository.criarUsuario(usuario);
	}

	async encontrarUsuarioPeloId(usuarioId: string): Promise<Usuario> {
		const usuario = await this.usuariosRepository.findOne({
			where: { id: usuarioId },
			select: ['email', 'nome', 'usuario', 'id'],
		});
		if (!usuario) throw new NotFoundException('Usuário não encontrado');
		return usuario;
	}

	async encontrarUsuarioCompletoPeloId(usuarioId: string): Promise<Usuario> {
		const usuario = await this.usuariosRepository.findOne({
			where: { id: usuarioId },
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

	async alterarSenha(alterarSenhaDto: AlterarSenhaDto, usuarioId: string) {
		const { senha, novaSenha } = alterarSenhaDto;

		const usuario = await this.encontrarUsuarioCompletoPeloId(usuarioId);
		if (!usuario) throw new NotFoundException('Usuário não encontrado.');

		const senhaValida = await bcrypt.compare(senha, usuario.senha);
		if (!senhaValida) throw new BadRequestException('As senhas não conferem');

		usuario.senha = await this.encriptarSenha(novaSenha, usuario.salt);
		const usuarioAlterado = await usuario.save();
		return usuarioAlterado;
	}

	async deletarUsuario(usuarioId: string) {
		const resultado = await this.usuariosRepository.delete({ id: usuarioId });
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
}
