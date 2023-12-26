import { DataSource, Repository } from 'typeorm';
import {
	ConflictException,
	Injectable,
	InternalServerErrorException,
} from '@nestjs/common';
import { Usuario } from './usuario.entity';
import { CriarUsuarioDto } from './dto/criar-usuario.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosRepository extends Repository<Usuario> {
	constructor(private dataSource: DataSource) {
		super(Usuario, dataSource.createEntityManager());
	}

	async criarUsuario(criarUsuarioDto: CriarUsuarioDto): Promise<Usuario> {
		const { email, usuario, nome, senha } = criarUsuarioDto;

		const novoUsuario = this.create();
		novoUsuario.email = email;
		novoUsuario.nome = nome;
		novoUsuario.ativo = true;
		novoUsuario.salt = await bcrypt.genSalt();
		novoUsuario.senha = await this.encriptarSenha(senha, novoUsuario.salt);
		novoUsuario.usuario = usuario;

		try {
			await novoUsuario.save();
			delete novoUsuario.senha;
			delete novoUsuario.salt;
			return novoUsuario;
		} catch (error) {
			if (error.code.toString() === '23505') {
				throw new ConflictException('Endereço de email já está em uso');
			} else {
				console.log('ERRO', error);
				throw new InternalServerErrorException(
					'Erro ao salvar o usuário no banco de dados',
				);
			}
		}
	}

	private async encriptarSenha(senha: string, salt: string): Promise<string> {
		return bcrypt.hash(senha, salt);
	}
}
