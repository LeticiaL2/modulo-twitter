import { ParametrosConsultaBaseDto } from 'src/shared/parametros-consulta-base.dto';

export class EncontrarTweetsParametrosDto extends ParametrosConsultaBaseDto {
	id: string;
	idUsuario: string;
}
