import { Injectable } from '@nestjs/common';
import { UsuariosRepository } from './usuarios.repository';
import { Usuario } from './usuario.entity';
import { CriarUsuarioDto } from './criar-usuario.dto';

@Injectable()
export class UsuariosService {
	constructor(private usuariosRepository: UsuariosRepository) {}

	async criarUsuario(criarUsuarioDto: CriarUsuarioDto): Promise<Usuario> {
		return this.usuariosRepository.criarUsuario(criarUsuarioDto);
	}
}
