import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateTweetDto {
  @IsNotEmpty()
  @MaxLength(280)
  texto: string;

  @IsNotEmpty()
  usuarioId: number;
}
