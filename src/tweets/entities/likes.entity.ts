import { User } from 'src/users/entities/users.entity'
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Tweet } from './tweet.entity'

@Entity('likes')
export class Like {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => User, user => user.likes)
  usuario: User

  @ManyToOne(() => Tweet, tweet => tweet.likes)
  tweet: Tweet
}
