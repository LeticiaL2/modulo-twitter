import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
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
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  senha: string;

  @ApiPropertyOptional({
    description: 'Utilizado para exibir o nome no perfil',
    example: 'Rafael',
  })
  @IsString()
  nome: string;

  @ApiProperty({
    description:
      'Usuario será um dado unico que identificará a conta e será exibido no perfil',
    example: '@rafael',
  })
  @IsString()
  usuario: string;
}
