import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';

@Module({
    controllers: [AuthController],
    imports: [UsersModule, PassportModule],
    providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
