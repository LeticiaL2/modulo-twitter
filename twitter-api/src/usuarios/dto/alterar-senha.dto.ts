import { IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator';

export class AlterarSenhaDto {
	@Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]*$/, {
		message:
			'A senha deve conter pelo menos 1 caractere minúsculo, 1 maiúsculo, 1 dígito e 1 símbolo.',
	})
	@IsNotEmpty({
		message: 'Informe uma senha',
	})
	@MinLength(6, {
		message: 'A senha deve ter no mínimo 6 caracteres',
	})
	@MaxLength(200, {
		message: 'A senha deve ter no máximo 200 caracteres',
	})
	senha: string;

	@Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]*$/, {
		message:
			'A senha deve conter pelo menos 1 caractere minúsculo, 1 maiúsculo, 1 dígito e 1 símbolo.',
	})
	@IsNotEmpty({
		message: 'Informe uma senha',
	})
	@MinLength(6, {
		message: 'A senha deve ter no mínimo 6 caracteres',
	})
	@MaxLength(200, {
		message: 'A senha deve ter no máximo 200 caracteres',
	})
	novaSenha: string;
}
