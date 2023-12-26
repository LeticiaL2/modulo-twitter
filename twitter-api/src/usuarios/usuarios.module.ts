import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosRepository } from './usuarios.repository';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './usuario.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Usuario])],
	providers: [UsuariosService, UsuariosRepository],
	controllers: [UsuariosController],
})
export class UsuariosModule {}
