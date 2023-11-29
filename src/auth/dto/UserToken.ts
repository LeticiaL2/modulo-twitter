import { ApiProperty } from '@nestjs/swagger'

export class UserToken {
  @ApiProperty()
  usuario: string

  @ApiProperty()
  nome: string

  @ApiProperty()
  token: string

  @ApiProperty()
  data_expiracao: Date
}
