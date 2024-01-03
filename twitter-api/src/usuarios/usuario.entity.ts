import {
	BaseEntity,
	Entity,
	Unique,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

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

	@CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
	data_criacao: Date;

	@UpdateDateColumn({
		type: 'timestamptz',
		default: () => 'CURRENT_TIMESTAMP',
		onUpdate: 'CURRENT_TIMESTAMP',
	})
	data_atualizacao: Date;

	@Column({ nullable: true, type: 'date' })
	data_ativacao: Date;

	async checarSenha(senha: string): Promise<boolean> {
		const hash = await bcrypt.hash(senha, this.salt);
		return hash === this.senha;
	}
}
