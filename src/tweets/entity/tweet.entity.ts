import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, JoinColumn } from 'typeorm';
import { User } from '../../users/entity/user.entity';
import { Like } from './like.entity';
import { Comment } from './comment.entity';
import { Retweet } from './retweet.entity';

@Entity('Tweet')
export class Tweet {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 280 })
    texto: string;

    @ManyToOne(() => User, usuario => usuario.tweets)
    @JoinColumn({ name: 'usuarioId' })
    usuario: User;

    @CreateDateColumn()
    data_criacao: Date;

    @Column({ default: false })
    excluido: boolean;

    @OneToMany(() => Like, likes => likes.tweet)
    likes: Like[];

    @OneToMany(() => Comment, comentarios => comentarios.tweetPai)
    comentarios: Comment[];

    @OneToMany(() => Comment, comentarios => comentarios.comentario)
    cmtTweet: Comment[];

    @OneToMany(() => Retweet, retweet => retweet.tweetPai)
    retweets: Retweet[];

    @OneToMany(() => Retweet, retweet => retweet.retweet)
    rtwTweet: Retweet[];
}
