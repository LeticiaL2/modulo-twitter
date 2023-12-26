import { Usuario } from '../usuario.entity';

export class RetornoUsuarioDto {
	usuario: Usuario;
	mensagem: string;
	status: number;
}
