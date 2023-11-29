import { ApiProperty } from '@nestjs/swagger'

export class CreateTweetDTO {
  @ApiProperty()
  texto: string
}
