import { Tweet } from '../tweet.entity';

export class RetornoTweetDto {
	conteudo: Tweet;
	mensagem: {
		codigo: number;
		texto: string;
	};
	status: boolean;
}
