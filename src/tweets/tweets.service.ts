import { Injectable } from '@nestjs/common';
import { CreateTweetDto } from './dto/create-tweets.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tweets } from './entity/tweets.entity';
import { Users } from 'src/users/entity/users.entity';

@Injectable()
export class TweetsService {
    constructor(
        @InjectRepository(Tweets)
        private tweetsRepository: Repository<Tweets>,
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
    ) {}
    
    async create(createTweetDto: CreateTweetDto, userId: number) {
        const user = await this.usersRepository.findOne({ where : { id: userId } });
        const newTweet = this.tweetsRepository.create({ ...createTweetDto, usuario: user });
        await this.tweetsRepository.save(newTweet);

        const response = {
            status: true,
            mensagem: {
                codigo: 201,
                texto: 'Tweet criado com sucesso!'
            },
            conteudo: {
                id: newTweet.id,
                texto: newTweet.texto,
                usuarioId: user.id,
                usuario: user.usuario,
                nome: user.nome,
                likes: 0,
                comentarios: 0,
                retweets: 0,
                data: newTweet.data_criacao
            }
        };


        return response;
    }
}
