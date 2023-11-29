import { ApiProperty } from '@nestjs/swagger'

export class AuthUserSuccessSwagger {
  @ApiProperty({ example: 'Teste da Silva' })
  nome: string

  @ApiProperty({ example: 'teste123' })
  usuario: string

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyYjdmYjg5MC00ZmZkLTQ1YmYtYWRkNi0wNzMxYmYzMDg1MjQiLCJlbWFpbCI6InRlc3RlQHRlc3RlLmNvbSIsIm5vbWUiOiJ0aGFsbGVzIHF1ZXZlZG8iLCJpYXQiOjE2OTk1NDc4ODEsImV4cCI6MTY5OTYzNDI4MX0.f8DKW_blXRrudviPicHbSOHRYmlkZugW33Ay5jjMeN4',
  })
  token: string

  @ApiProperty()
  data_expiracao: Date
}

export class AuthUserFailureSwagger {
  @ApiProperty({ example: 'Unauthorized' })
  message: string

  @ApiProperty({ example: 401 })
  statusCode: number
}
