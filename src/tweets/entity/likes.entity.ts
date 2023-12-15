import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Tweets } from "./tweets.entity";
import { Users } from "src/users/entity/users.entity";


@Entity('Likes')
export class Likes {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Tweets)
    @JoinColumn({ name: 'tweetId' })
    tweet: Tweets;

    @ManyToOne(() => Users)
    @JoinColumn({ name: 'usuarioId' })
    usuario: Users;
}