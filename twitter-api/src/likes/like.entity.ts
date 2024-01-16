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
	@JoinColumn({ name: 'usuarioId' })
	usuarioId: Usuario;

	@ManyToOne(() => Tweet)
	@JoinColumn({ name: 'tweetId' })
	tweetId: Tweet;
}
