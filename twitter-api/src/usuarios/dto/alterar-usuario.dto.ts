import { IsOptional, IsString, IsEmail } from 'class-validator';

export class AlterarUsuarioDto {
	@IsOptional()
	@IsString({
		message: 'Informe um nome válido',
	})
	nome: string;

	@IsOptional()
	@IsString({
		message: 'Informe um usuário válido',
	})
	usuario: string;
	@IsOptional()
	@IsEmail(
		{},
		{
			message: 'Informe um endereço de email válido',
		},
	)
	email: string;

	@IsOptional()
	ativo: boolean;
}
