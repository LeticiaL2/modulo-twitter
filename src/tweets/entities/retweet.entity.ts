import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Tweet } from './tweet.entity'

@Entity('retweets')
export class Retweet {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => Tweet, tweet => tweet.retweets)
  tweetPai: Tweet

  @ManyToOne(() => Tweet, tweet => tweet.retweetPai)
  tweet: Tweet
}
