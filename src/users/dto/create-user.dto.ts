import { IsEmail, IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDTO {
  @ApiProperty({
    description: 'Email do usuário',
    example: 'teste@teste.com',
  })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string

  @ApiProperty({
    description: 'Nome do usuário',
    example: 'teste123',
  })
  @IsString()
  @IsNotEmpty()
  readonly usuario: string

  @ApiProperty({
    description: 'Nome do usuário',
    example: 'Teste da Silva',
  })
  @IsString()
  readonly nome: string

  @ApiProperty({
    description: 'Senha do usuário',
    example: '123456',
  })
  @IsString()
  @IsNotEmpty()
  readonly senha: string
}
