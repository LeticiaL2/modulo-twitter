import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUsersDto: CreateUserDto) {
    const { email, usuario, senha } = createUsersDto;

    // Verificar se email/usuario ja existem
    const existingUser = await this.usersRepository.findOne({
      where: [{ email }, { usuario }],
    });
    if (existingUser) {
      throw new BadRequestException({
        message: ['Email ou Usuário já existem'],
        error: 'Bad Request',
        statusCode: 400,
      });
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(senha, 10);
    createUsersDto.senha = hashedPassword;

    // Criacao com sucesso!
    await this.usersRepository.save(createUsersDto);

    const successResponse = {
      status: true,
      mensagem: {
        codigo: 201,
        texto: 'Usuário registrado com sucesso!',
      },
      conteudo: true,
      // conteudo: {
      //     email: newUser.email,
      //     nome: newUser.nome,
      //     usuario: newUser.usuario
      // }
    };

    return successResponse;
  }

  findByEmail(email: string) {
    return this.usersRepository.findOne({ where: { email } });
  }
}
