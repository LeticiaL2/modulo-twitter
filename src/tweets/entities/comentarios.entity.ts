import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Tweet } from './tweet.entity'

@Entity('comentarios')
export class Comentario {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => Tweet, tweet => tweet.comentarios)
  tweetPai: Tweet

  @ManyToOne(() => Tweet, tweet => tweet.tweetPai)
  tweet: Tweet
}
