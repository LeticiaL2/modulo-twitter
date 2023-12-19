import { Users } from "src/users/entity/users.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Tweets } from "./tweets.entity";


@Entity('Comentarios')
export class Comments {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Tweets)
  @JoinColumn({ name: 'tweetPaiId' })
  tweetPai: Tweets;

  @ManyToOne(() => Tweets)
  @JoinColumn({ name: 'tweetId' })
  tweet: Tweets;
}