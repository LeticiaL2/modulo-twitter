import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async validateUser(email: string, senha: string){
        const user = await this.usersService.findByEmail(email);
        if (user) {
            if (await bcrypt.compare(senha, user.senha)) {
                return user;
            } 
        }

        return null;
    }

    async login(user: any) {
        const payload =  {email: user.email, sub:user.id};
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
