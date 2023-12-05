import { IsEmail, IsString } from "class-validator";

export class UpdateUsersDto {
    @IsString()
    nome: string;

    @IsEmail()
    email: string;
}