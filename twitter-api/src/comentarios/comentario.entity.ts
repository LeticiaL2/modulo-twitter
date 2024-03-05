import { Tweet } from 'src/tweets/tweet.entity';
import {
	Entity,
	BaseEntity,
	PrimaryGeneratedColumn,
	JoinColumn,
	ManyToOne,
} from 'typeorm';

@Entity()
export class Comentario extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@ManyToOne(() => Tweet)
	@JoinColumn({ name: 'idTweetPai' })
	idTweetPai: Tweet;

	@ManyToOne(() => Tweet)
	@JoinColumn({ name: 'idTweet' })
	idTweet: Tweet;
}
