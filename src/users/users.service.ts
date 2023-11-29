import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { User } from './entities/users.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import * as bcrypt from 'bcrypt'
import { CreateUserDTO } from './dto/create-user.dto'
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception'
import { ResponseModel } from 'src/utils/models'
import { ResponseCreateUserDTO } from './dto/reponse-user.dto'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findByEmail(email: string) {
    return this.userRepository.findOneBy({ email })
  }

  async findOne(id: string) {
    const user = await this.userRepository.find({ where: { id } })
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }
    return user
  }

  // async userIsActive(id: string) {
  //   const user = await this.userRepository.findOneBy({ id })
  //   if (!user) {
  //     throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND)
  //   }

  //   if (!user.ativo) {
  //     throw new HttpException('Usuário não ativo', HttpStatus.FORBIDDEN)
  //   }

  //   return user
  // }

  async create(
    createUserDto: CreateUserDTO,
  ): Promise<ResponseModel<ResponseCreateUserDTO>> {
    const usernameExists = await this.userRepository.findOneBy({
      usuario: createUserDto.usuario,
    })

    if (usernameExists) {
      throw new BadRequestException({
        status: false,
        mensagem: {
          codigo: 400,
          texto: 'Usuário já existe',
        },
        conteudo: null,
      })
    }

    const emailExists = await this.userRepository.findOneBy({
      email: createUserDto.email,
    })

    if (emailExists) {
      throw new BadRequestException({
        status: false,
        mensagem: {
          codigo: 400,
          texto: 'Email já existe',
        },
        conteudo: null,
      })
    }
    const newUser = await this.userRepository.save({
      ...createUserDto,
      senha: await bcrypt.hash(createUserDto.senha, 10),
    })

    const response = {
      status: true,
      mensagem: {
        codigo: 201,
        texto: 'Usuário criado com sucesso',
      },
      conteudo: {
        email: newUser.email,
        usuario: newUser.usuario,
        nome: newUser.nome,
      },
    }

    return response
  }
}
