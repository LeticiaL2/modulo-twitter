import { Module } from '@nestjs/common';
import { ComentariosService } from './comentarios.service';
import { ComentariosRepository } from './comentarios.repository';

@Module({
	providers: [ComentariosService, ComentariosRepository],
})
export class ComentariosModule {}
