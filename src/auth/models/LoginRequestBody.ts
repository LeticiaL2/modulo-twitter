import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginRequestBody {
  @ApiProperty({
    description:
      'Email utilizado para identificar o usuario e realizar o login',
    example: 'teste@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description:
      'Senha utilizada para o login, deve ter no minimo 4 caracteres sendo pelo menos uma letra maiuscula, um simbolo e um número',
    example: '@Teste123',
  })
  @IsString()
  password: string;
}
