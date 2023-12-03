export class TweetResponseDto {
  id: number;
  texto: string;
  usuarioId: number;
  usuario: string;
  nome: string;
  likes: number;
  liked: boolean;
  comentarios: number;
  retweets: number;
  data: Date;
  comentariosArray?: any[];
  tweetPaiId?: number;
  tweetPai?: any[];
}
