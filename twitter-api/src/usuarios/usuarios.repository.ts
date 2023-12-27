import { DataSource, Repository } from 'typeorm';
import {
	ConflictException,
	Injectable,
	InternalServerErrorException,
} from '@nestjs/common';
import { Usuario } from './usuario.entity';
import { CriarUsuarioDto } from './dto/criar-usuario.dto';
import * as bcrypt from 'bcrypt';
import { EncontrarUsuariosParametrosDto } from './dto/encontrar-usuarios-parametros.dto';
import { CredenciaisDto } from 'src/autenticacao/credenciais.dto';

@Injectable()
export class UsuariosRepository extends Repository<Usuario> {
	constructor(private dataSource: DataSource) {
		super(Usuario, dataSource.createEntityManager());
	}

	async encontrarUsuarios(
		consultaDto: EncontrarUsuariosParametrosDto,
	): Promise<{ usuarios: Usuario[]; total: number }> {
		consultaDto.ativo =
			consultaDto.ativo === undefined ? true : consultaDto.ativo;
		consultaDto.pagina =
			consultaDto.pagina === undefined || consultaDto.pagina < 1
				? 1
				: consultaDto.limite;
		consultaDto.limite =
			consultaDto.limite === undefined || consultaDto.limite > 100
				? 100
				: consultaDto.limite;

		const { email, nome, usuario, ativo, id } = consultaDto;
		const consulta = this.createQueryBuilder('usuario');

		consulta.where('usuario.ativo = :ativo', { ativo });

		if (email) {
			consulta.andWhere('usuario.email ILIKE :email', { email: `%${email}%` });
		}

		if (nome) {
			consulta.andWhere('usuario.nome ILIKE :nome', { nome: `%${nome}` });
		}

		if (usuario) {
			consulta.andWhere('usuario.usuario ILIKE :usuario', {
				usuario: `%${usuario}%`,
			});
		}

		if (id) {
			consulta.andWhere('usuario.id ILIKE :id', { id: `%${id}` });
		}

		consulta.skip((consultaDto.pagina - 1) * consultaDto.limite);
		consulta.take(+consultaDto.limite);
		consulta.orderBy(
			consultaDto.ordenar ? JSON.parse(consultaDto.ordenar) : undefined,
		);
		consulta.select([
			'usuario.id',
			'usuario.nome',
			'usuario.usuario',
			'usuario.email',
			'usuario.ativo',
		]);

		const [usuarios, total] = await consulta.getManyAndCount();

		return { usuarios, total };
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

	async checarCredenciais(credenciaisDto: CredenciaisDto): Promise<Usuario> {
		const { email, senha } = credenciaisDto;
		const usuario = await this.findOne({ where: { email, ativo: true } });

		if (usuario && (await usuario.checarSenha(senha))) {
			return usuario;
		} else {
			return null;
		}
	}
}
