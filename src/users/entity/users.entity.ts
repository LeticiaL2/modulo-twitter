import { Exclude } from "class-transformer";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Users {
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

    @Column({  default: true })
    ativo: boolean

    @CreateDateColumn()
    @Exclude()
    data_criacao: Date;

    @UpdateDateColumn()
    @Exclude()
    data_atualizacao: Date;

    @UpdateDateColumn()
    @Exclude()
    data_ativacao: Date;
}