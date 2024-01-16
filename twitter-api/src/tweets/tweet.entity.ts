import { Usuario } from 'src/usuarios/usuario.entity';
import {
	Entity,
	BaseEntity,
	Column,
	CreateDateColumn,
	PrimaryGeneratedColumn,
	JoinColumn,
	ManyToOne,
} from 'typeorm';

@Entity()
export class Tweet extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ nullable: false, type: 'varchar', length: 280 })
	texto: string;

	@Column({ nullable: false, type: 'uuid' })
	idUsuario: string;

	@CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
	data_criacao: Date;

	@Column({ nullable: false, type: 'boolean', default: false })
	excluido: boolean;

	@ManyToOne(() => Usuario, (usuario) => usuario.tweets)
	@JoinColumn({ name: 'idUsuario' })
	usuario: Usuario;

	likes: number;
}
