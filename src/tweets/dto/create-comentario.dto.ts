import { IsString, Length } from 'class-validator';

export class CreateComentarioDto {
  @IsString()
  @Length(1, 280)
  texto: string;
  tweetPaiId: number;
  tweetId: number;
}
