import {
	IsNotEmpty,
	IsEmail,
	MaxLength,
	MinLength,
	Matches,
} from 'class-validator';

export class CriarUsuarioDto {
	@IsNotEmpty({
		message: 'Informe um endereço de email',
	})
	@IsEmail(
		{},
		{
			message: 'Informe um endereço de email válido',
		},
	)
	@MaxLength(100, {
		message: 'O endereço de email deve ter menos de 100 caracteres',
	})
	email: string;

	@IsNotEmpty({
		message: 'Informe o usuário',
	})
	@MaxLength(50, {
		message: 'O usuário deve ter menos de 50 caracteres',
	})
	usuario: string;

	@MaxLength(100, {
		message: 'O nome deve ter menos de 100 caracteres',
	})
	nome: string;

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
}
