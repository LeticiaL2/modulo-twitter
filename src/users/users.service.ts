import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entity/users.entity';
import { Repository } from 'typeorm';
import { UpdateUsersDto } from './dto/update-users.dto';
import { CreateUsersDto } from './dto/create-users.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
    ) {}


    get(): Promise<Users[]>{ 
        return this.usersRepository.find();
    }


    async create(createUsersDto: CreateUsersDto){
        const { email, usuario, senha } = createUsersDto;

        // Verificar se email/usuario ja existem
        const existingUser = await this.usersRepository.findOne({ where: [{ email }, { usuario }]});
        if (existingUser) {
            throw new BadRequestException({           
                    message: [ 'Email ou Usuário já existem' ],
                    error: 'Bad Request',
                    statusCode: 400
            });
        }

        // Hash da senha
        const hashedPassword = await bcrypt.hash(senha, 10);
        createUsersDto.senha = hashedPassword;

        // Criacao com sucesso!
        const newUser = await this.usersRepository.save(createUsersDto);
        
        const successResponse = {
            status: true,
            mensagem: {
                codigo: 201,
                texto: 'Usuário registrado com sucesso!'
            },
            conteudo: {
                email: newUser.email,
                nome: newUser.nome,
                usuario: newUser.usuario
            }
        };    

        return successResponse;
    }

    update( updateUsersDto: UpdateUsersDto, userId : number) {
        return this.usersRepository.update(userId, updateUsersDto);
    }

    show( id: number ) {
        return this.usersRepository.findOne({ where: { id } });
    }

    delete( userId: number ) {
        return this.usersRepository.delete(userId);
    }

}
