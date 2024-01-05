import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Tweet } from './tweet.entity';

@Entity('Retweet')
export class Retweet {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Tweet, (tweet) => tweet.retweets)
  @JoinColumn({ name: 'tweetPaiId' })
  tweetPai: Tweet;

  @ManyToOne(() => Tweet, (tweet) => tweet.rtwTweet)
  @JoinColumn({ name: 'tweetId' })
  retweet: Tweet;
}
