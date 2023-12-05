import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entity/users.entity';
import { Repository } from 'typeorm';
import { UpdateUsersDto } from './dto/update-users.dto';
import { CreateUsersDto } from './dto/create-users.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
    ) {}


    get(): Promise<Users[]>{ 
        return this.usersRepository.find();
    }

    create( createUsersDto: CreateUsersDto){
        return this.usersRepository.save(createUsersDto);
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
