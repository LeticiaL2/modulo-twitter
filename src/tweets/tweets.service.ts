import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateTweetDto } from './dto/create-tweets.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tweets } from './entity/tweets.entity';
import { Users } from 'src/users/entity/users.entity';
import { response } from 'express';


@Injectable()
export class TweetsService {
    constructor(
        @InjectRepository(Tweets)
        private tweetsRepository: Repository<Tweets>,
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
    ) {}

    async getTweets() {
        const tweets =  await this.tweetsRepository.find({ relations: ["usuario"], where: { excluido: false } });

        const formattedTweets = tweets.map(tweet => ({
            id: tweet.id,
            texto: tweet.texto,
            usuarioId: tweet.usuario.id,
            usuario: tweet.usuario.usuario,
            nome: tweet.usuario.nome,
            likes: null, //TODO
            liked: null, //TODO
            comentarios: null, //TODO
            retweets: null, //TODO
            data: tweet.data_criacao,
        }));

        return {
            status: true,
            mensagem: {
                codigo: 200,
                texto: 'Tweets encontrados com sucesso!'
            },
            conteudo: formattedTweets,
        };

    }

    
    async postTweet(createTweetDto: CreateTweetDto, userId: number) {
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

    async deleteTweet(id: number, userId: number) {
        const tweet = await this.tweetsRepository.findOne({ 
            where: { id },
            relations: ["usuario"],
        });

        if (!tweet) {
            throw new NotFoundException('Tweet não encontrado');
        }

        if (tweet.usuario.id !== userId) {
            throw new UnauthorizedException('Você não tem permissão para excluir este tweet');
        }

        tweet.excluido = true;
        tweet.texto = '';
        await this.tweetsRepository.save(tweet);
        
        const response = {
            status: true,
            mensagem: {
                codigo: 200,
                texto: 'Tweet excluído com sucesso!'
            },
            conteudo: null
        };


        return response;
    }

}
