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

    // Email ja existe
    const existingEmail = await this.usersRepository.findOne({
      where: { email },
    });
    if (existingEmail) {
      throw new BadRequestException({
        message: ['Email já existe'],
        error: 'Bad Request',
        statusCode: 400,
      });
    }

    // Usuario ja existe
    const existingUser = await this.usersRepository.findOne({
      where: { usuario },
    });
    if (existingUser) {
      throw new BadRequestException({
        message: ['Usuário já existe'],
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
