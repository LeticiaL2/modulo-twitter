export class TweetResponseDto {
  id: number;
  texto: string;
  usuarioId: number;
  usuario: string;
  nome: string;
  likes: number;
  comentarios: number;
  retweets: number;
  data: Date;
  comentariosArray?: any[];
  tweetPaiId?: number; // Adiciona a propriedade tweetPaiId
  tweetPai?: any[];
}
