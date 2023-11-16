export class CreateTweetDto {
  texto: string;
  comentario?: {
    tweetId?: number;
  };
}
