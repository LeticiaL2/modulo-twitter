import { IsNotEmpty } from 'class-validator'

export class CreateLikeDTO {
  @IsNotEmpty()
  readonly tweetId: string

  @IsNotEmpty()
  readonly usuarioId: string
}
