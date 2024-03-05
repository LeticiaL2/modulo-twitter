import { Tweet } from 'src/tweets/tweet.entity';
import { Usuario } from 'src/usuarios/usuario.entity';
import {
	Entity,
	BaseEntity,
	PrimaryGeneratedColumn,
	JoinColumn,
	ManyToOne,
} from 'typeorm';

@Entity()
export class Like extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@ManyToOne(() => Usuario)
	@JoinColumn({ name: 'idUsuario' })
	idUsuario: Usuario;

	@ManyToOne(() => Tweet)
	@JoinColumn({ name: 'idTweet' })
	idTweet: Tweet;
}
