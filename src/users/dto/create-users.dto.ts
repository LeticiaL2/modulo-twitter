import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, Length } from "class-validator";

export class CreateUsersDto {

    @IsNotEmpty({ message: 'Nome é obrigatório' })
    //@IsNotEmpty()
    @Length(1, 50)
    @IsString()
    nome: string;


    @IsNotEmpty({ message: 'Email é obrigatório'})
    //@IsNotEmpty()
    @Length(1, 50)
    @IsEmail({}, { message: 'Formato de email inválido' })
    //@IsEmail()
    email: string;

    
    @IsNotEmpty({ message: 'Usuário é obrigatório' })
    //@IsNotEmpty()
    @Length(1, 50)
    @IsString()
    usuario: string;

    
    @IsNotEmpty({ message: 'Senha é obrigatória'})
    //@IsNotEmpty()
    @Length(1, 50)
    @IsString()
    // 1+ simbolo, 1+ maiscula, 1+ minuscula, 1+ numero, 8+ tamanho 
    //@IsStrongPassword()
    @IsStrongPassword({}, { message: 'A senha deve ser mais forte'})
    senha: string;
}