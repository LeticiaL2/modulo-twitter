import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

@Injectable()
export class UserRepository extends Repository<User> {
    constructor(private dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }
  async createUser(
    createUserDto: CreateUserDto,
  ): Promise<User> {
    const { email, usuario, nome, senha } = createUserDto;

    const user = this.create();
    user.email = email;
    user.usuario = usuario;
    user.nome = nome;
    user.salt = await bcrypt.genSalt();
    user.senha = await this.hashPassword(senha, user.salt);
    try {
      await user.save();
      delete user.senha;
      delete user.salt;
      return user;
    } catch (error) {
      if (error.code.toString() === '23505') {
        throw new ConflictException('Endereço de email já está em uso');
      } else {
        throw new InternalServerErrorException(
          'Erro ao salvar o usuário no banco de dados',
        );
      }
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}