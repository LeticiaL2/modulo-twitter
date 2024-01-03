import { User } from "src/users/entity/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Tweet } from "./tweet.entity";


@Entity('Comentarios')
export class Comment {
	
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Tweet, tweet => tweet.comentarios)
	@JoinColumn({ name: 'tweetPaiId' })
	tweetPai: Tweet;

	@ManyToOne(() => Tweet, tweet => tweet.cmtTweet)
	@JoinColumn({ name: 'tweetId' })
	comentario: Tweet;
}