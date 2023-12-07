import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async validateUser(email: string, senha: string){
        const user = await this.usersService.findByEmail(email);
        if (user) {
            if (await bcrypt.compare(senha, user.senha)) {
                return user;
            } 
        }

        return null;
    }
}
