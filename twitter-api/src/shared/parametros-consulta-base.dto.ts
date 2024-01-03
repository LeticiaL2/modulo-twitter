export abstract class ParametrosConsultaBaseDto {
	ordenar: string;
	ordenarPor: 'ASC' | 'DESC';
	pagina: number;
	limite: number;
}
