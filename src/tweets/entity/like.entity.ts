import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Tweet } from './tweet.entity';
import { User } from 'src/users/entity/user.entity';

@Entity('Likes')
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Tweet, (tweet) => tweet.likes)
  @JoinColumn({ name: 'tweetId' })
  tweet: Tweet;

  @ManyToOne(() => User, (usuario) => usuario.likes)
  @JoinColumn({ name: 'usuarioId' })
  usuario: User;
}
