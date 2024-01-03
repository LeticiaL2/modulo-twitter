import { Usuario } from '../usuario.entity';

export class RetornoUsuarioDto {
	conteudo: Usuario;
	mensagem: {
		codigo: number;
		texto: string;
	};
	status: boolean;
}
