import { IsEmail, IsString } from "class-validator";

export class CreateUsersDto {
    @IsString()
    nome: string;

    @IsEmail()
    email: string;
}