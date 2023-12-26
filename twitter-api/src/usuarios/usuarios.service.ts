import { Injectable, NotFoundException } from '@nestjs/common';
import { UsuariosRepository } from './usuarios.repository';
import { Usuario } from './usuario.entity';
import { CriarUsuarioDto } from './dto/criar-usuario.dto';

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
}
