import { IsNotEmpty, MaxLength } from 'class-validator';

export class CriarTweetDto {
	@IsNotEmpty({
		message: 'Informe o texto do tweet',
	})
	@MaxLength(280, {
		message: 'O texto deve ter menos de 280 caracteres',
	})
	texto: string;
}
