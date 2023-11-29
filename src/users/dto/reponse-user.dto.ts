// import { IsEmail, IsNotEmpty, IsString } from 'class-validator'
// import { ApiProperty } from '@nestjs/swagger'

import { ApiProperty } from '@nestjs/swagger'

export class ResponseCreateUserDTO {
  @ApiProperty()
  email: string

  @ApiProperty()
  usuario: string

  @ApiProperty()
  nome: string
}
