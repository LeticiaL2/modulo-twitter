import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, JoinColumn } from 'typeorm';
import { Users } from '../../users/entity/users.entity';

@Entity('Tweet')
export class Tweets {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 280 })
    texto: string;

    @ManyToOne(() => Users)
    @JoinColumn({ name: 'usuarioId' })
    usuario: Users;

    @CreateDateColumn()
    data_criacao: Date;

    @Column({ default: false })
    excluido: boolean;

}
