export class Tweet {
  texto: string;
  comentario?: {
    tweetId?: number;
  };
  id: number;
  usuario: string;
  nome: string;
  likes: number;
  comentarios: number;
  retweets: number;
}
