import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtOptions } from '../config/config';

@Module({
    controllers: [AuthController],
    imports: [
        UsersModule, 
        PassportModule, 
        JwtModule.register({
            secret: jwtOptions.secret,
            signOptions: jwtOptions.signOptions,
        }),
    ],
    providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
