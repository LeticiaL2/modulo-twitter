import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUsersDto } from './dto/update-users.dto';
import { CreateUsersDto } from './dto/create-users.dto';


@Controller('api/v1/usuarios')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    getUsers() {
        return this.usersService.get();
    }

    @Post()
    store(@Body() createUsersDto: CreateUsersDto) {
        return this.usersService.create(createUsersDto);
    }

    @Patch('/:userId')
    update(
        @Body() updateUsersDto: UpdateUsersDto, 
        @Param('userId', ParseIntPipe) userId: number
    ) {
        return this.usersService.update(updateUsersDto, userId);
    }

    @Get('/:userId')
    getUser(@Param('userId', ParseIntPipe) userId: number) {
        return this.usersService.show(userId);
    }

    @Delete('/:userId')
    deleteUser(@Param('userId', ParseIntPipe) userId: number) {
        return this.usersService.delete(userId);
    }
}
