import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Exclude } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'
import { Tweet } from 'src/tweets/entities/tweet.entity'
import { Like } from 'src/tweets/entities/likes.entity'

@Entity('usuarios')
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Exclude()
  id: string

  @Column({ unique: true })
  @ApiProperty({ example: 'teste@tes.com.br' })
  email: string

  @Column({ unique: true })
  @ApiProperty({ example: 'teste123' })
  usuario: string

  @Column({ nullable: true })
  @ApiProperty({ example: 'Teste da Silva' })
  nome: string

  @Column()
  @Exclude()
  senha: string

  @Column({ default: true })
  @Exclude()
  ativo: boolean

  @CreateDateColumn()
  @Exclude()
  data_criacao: Date

  @CreateDateColumn()
  @Exclude()
  data_atualizacao: Date

  @CreateDateColumn()
  @Exclude()
  data_ativacao: Date

  @Column({ nullable: true })
  @Exclude()
  expiracao_token: Date

  @OneToMany(() => Tweet, tweet => tweet.usuario)
  tweets: Tweet[]

  @OneToMany(() => Like, like => like.usuario)
  likes: Like[]
}
