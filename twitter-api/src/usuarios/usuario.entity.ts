import {
	BaseEntity,
	Entity,
	Unique,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity()
@Unique(['email'])
export class Usuario extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ nullable: false, type: 'varchar', length: 100 })
	email: string;

	@Column({ nullable: false, type: 'varchar', length: 50 })
	usuario: string;

	@Column({ nullable: true, type: 'varchar', length: 100 })
	nome: string;

	@Column({ nullable: false, type: 'varchar', length: 200 })
	senha: string;

	@Column({ nullable: false, type: 'boolean' })
	ativo: boolean;

	@Column({ nullable: false })
	salt: string;

	@CreateDateColumn()
	data_criacao: Date;

	@UpdateDateColumn()
	data_atualizacao: Date;

	@Column({ nullable: true, type: 'date' })
	data_ativacao: Date;
}
