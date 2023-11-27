import { IsOptional, IsString } from 'class-validator';

export class CreateRetweetDto {
  @IsString()
  @IsOptional()
  texto: string;
  tweetPaiId: number;
  tweetId: number;
}
