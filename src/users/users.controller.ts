import { Controller, Get } from '@nestjs/common';


@Controller('/users')
export class UsersController {
    @Get()
    getUsers() {
        return { name: 'Thiago', email: 't@gmail.com'}
    }
}
