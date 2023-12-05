import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    // @Column()
    // usuario: string;

    @Column()
    nome: string;

    // @Column()
    // senha: string;

    // @Column()
    // ativo: boolean

    // @Column()
    // data_criacao: Date;

    // @Column()
    // data_atualizacao: Date;

    // @Column()
    // data_ativacao: Date;
}