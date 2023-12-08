import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';


@Controller('api/v1/tweets')
export class TweetsController {


    @UseGuards(JwtAuthGuard)
    @Get()
    profile() {
        return { message: 'Protected Route'};
    }
}
