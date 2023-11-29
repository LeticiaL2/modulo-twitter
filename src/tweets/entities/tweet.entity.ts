import { User } from 'src/users/entities/users.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Like } from './likes.entity'
import { Comentario } from './comentarios.entity'
import { Retweet } from './retweet.entity'

@Entity('tweets')
export class Tweet {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  texto: string

  @CreateDateColumn()
  data_criacao: Date

  @Column({ default: false })
  excluido: boolean

  @ManyToOne(() => User, user => user.tweets)
  usuario: User

  @OneToMany(() => Like, like => like.tweet)
  likes: Like[]

  @OneToMany(() => Comentario, comentario => comentario.tweetPai)
  comentarios: Comentario[]

  @OneToMany(() => Comentario, comentario => comentario.tweet)
  tweetPai: Comentario

  @OneToMany(() => Retweet, retweet => retweet.tweetPai)
  retweets: Retweet[]

  @OneToMany(() => Retweet, retweet => retweet.tweet)
  retweetPai: Retweet
}
