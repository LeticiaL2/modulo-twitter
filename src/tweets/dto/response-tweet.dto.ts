// import { IsEmail, IsNotEmpty, IsString } from 'class-validator'
// import { ApiProperty } from '@nestjs/swagger'

import { ApiProperty } from '@nestjs/swagger'

export class ResponseCreateTweetDTO {
  @ApiProperty()
  id: string

  @ApiProperty()
  texto: string

  @ApiProperty()
  usuario: string

  @ApiProperty()
  usuarioId: string

  @ApiProperty()
  nome: string

  @ApiProperty()
  likes: number

  @ApiProperty()
  comentarios: number

  @ApiProperty()
  retweets: number

  @ApiProperty()
  data: Date
}
