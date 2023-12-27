import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AutenticacaoModule } from './autenticacao/autenticacao.module';
@Module({
	imports: [TypeOrmModule.forRoot(typeOrmConfig), UsuariosModule, AutenticacaoModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
