import { Exclude } from 'class-transformer';
import { Like } from 'src/tweets/entity/like.entity';
import { Tweet } from 'src/tweets/entity/tweet.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Usuario')
export class User {
  @PrimaryGeneratedColumn()
  @Exclude()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  usuario: string;

  @Column()
  nome: string;

  @Column()
  @Exclude()
  senha: string;

  @Column({ default: true })
  ativo: boolean;

  @CreateDateColumn()
  @Exclude()
  data_criacao: Date;

  @UpdateDateColumn()
  @Exclude()
  data_atualizacao: Date;

  @UpdateDateColumn()
  @Exclude()
  data_ativacao: Date;

  @OneToMany(() => Tweet, (tweet) => tweet.usuario)
  tweets: Tweet[];

  @OneToMany(() => Like, (likes) => likes.usuario)
  likes: Like[];
}
