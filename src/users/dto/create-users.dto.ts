import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, Length } from "class-validator";

export class CreateUsersDto {

    @IsString()
    @Length(1, 50)
    @IsNotEmpty({ message: 'Nome é obrigatório' })
    //@IsNotEmpty()
    nome: string;
    
    
    @IsEmail({}, { message: 'Formato de email inválido' })
    //@IsEmail()
    @Length(1, 50)
    @IsNotEmpty({ message: 'Email é obrigatório'})
    //@IsNotEmpty()
    email: string;

    
    @IsString()
    @IsNotEmpty({ message: 'Usuário é obrigatório' })
    @Length(1, 50)
    //@IsNotEmpty()
    usuario: string;
    
    // 1+ simbolo, 1+ maiscula, 1+ minuscula, 1+ numero, 8+ tamanho 
    //@IsStrongPassword()
    @IsStrongPassword({}, { message: 'A senha deve ser mais forte'})
    //@IsNotEmpty()
    @IsString()
    @Length(1, 50)
    @IsNotEmpty({ message: 'Senha é obrigatória'})
    senha: string;
}