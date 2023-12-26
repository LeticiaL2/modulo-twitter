import {
	Injectable,
	InternalServerErrorException,
	NotFoundException,
} from '@nestjs/common';
import { UsuariosRepository } from './usuarios.repository';
import { Usuario } from './usuario.entity';
import { CriarUsuarioDto } from './dto/criar-usuario.dto';
import { AlterarUsuarioDto } from './dto/alterar-usuario.dto';

@Injectable()
export class UsuariosService {
	constructor(private usuariosRepository: UsuariosRepository) {}

	async criarUsuario(criarUsuarioDto: CriarUsuarioDto): Promise<Usuario> {
		return this.usuariosRepository.criarUsuario(criarUsuarioDto);
	}

	async encontrarUsuarioPeloId(idUsuario: string): Promise<Usuario> {
		const usuario = await this.usuariosRepository.findOne({
			where: { id: idUsuario },
			select: ['email', 'nome', 'usuario', 'id'],
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
}
