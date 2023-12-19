import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Tweets } from "./tweets.entity";


@Entity('Retweet')
export class Retweets {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Tweets)
  @JoinColumn({ name: 'tweetPaiId' })
  tweetPai: Tweets;

  @ManyToOne(() => Tweets)
  @JoinColumn({ name: 'tweetId' })
  tweet: Tweets;
}