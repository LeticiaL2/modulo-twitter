import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, Length } from "class-validator";

export class CreateUsersDto {

    @IsString({ message: 'Nome em formato inválido' })
    @Length(1, 50, { message: 'Nome deve conter menos de 50 caracteres' }) 
    @IsNotEmpty({ message: 'Nome é obrigatório' })
    nome: string;
    
    
    @IsEmail({}, { message: 'Email em formato inválido' })
    @Length(1, 50, { message: 'Email deve conter menos de 50 caracteres' })
    @IsNotEmpty({ message: 'Email é obrigatório'})
    email: string;

    
    @IsString({ message: 'Usuário em formato inválido' })
    @IsNotEmpty({ message: 'Usuário é obrigatório' })
    @Length(1, 50, { message: 'Usuário deve conter menos de 50 caracteres' })
    usuario: string;
    
    // 1+ simbolo, 1+ maiscula, 1+ minuscula, 1+ numero, 8+ tamanho total
    @IsStrongPassword({}, { message: 'Senha deve ser mais forte'})
    @IsString({ message: 'Senha em formato inválido' })
    @Length(1, 50, { message: 'Senha deve conter menos de 50 caracteres' })
    @IsNotEmpty({ message: 'Senha é obrigatória'})
    senha: string;
}