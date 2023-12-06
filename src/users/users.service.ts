import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

    // create( createUsersDto: CreateUsersDto){
    //     return this.usersRepository.save(createUsersDto);
    // }

    async create(createUsersDto: CreateUsersDto){
        const { email, usuario, nome, senha } = createUsersDto;

        // Verificar se campos estao preenchidos
        // Nunca entra, causa = DTO
        if (!email || !usuario || !nome || !senha) {
            throw new HttpException(
                'Todos os campos são obrigatórios',
                HttpStatus.BAD_REQUEST,
            );
        }   

        // Verificar se email/usuario ja existem
        const existingUser = await this.usersRepository.findOne({ where: [{ email }, { usuario }]});
        if (existingUser) {
            throw new HttpException(
                'Email ou Usuário já existem',
                HttpStatus.BAD_REQUEST,
            );
        }

        // Hash da senha, 10 rounds ok?
        const hashedPassword = await bcrypt.hash(senha, 10);
        createUsersDto.senha = hashedPassword;

        // Criacao com sucesso!
        const newUser = await this.usersRepository.save(createUsersDto);
        
        const successResponse = {
            status: 201,
            mensagem: {
                //codigo?
                codigo: 0,
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
