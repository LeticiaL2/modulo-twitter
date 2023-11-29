import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class AuthUserDTO {
  @ApiProperty({
    description: 'Email do usuário',
    example: 'teste@teste.com',
  })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string

  @ApiProperty({
    description: 'Senha do usuário',
    example: '123456',
  })
  @IsString()
  @IsNotEmpty()
  readonly senha: string
}
