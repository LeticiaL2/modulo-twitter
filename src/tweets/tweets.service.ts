import { BadRequestException, ConsoleLogger, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateTweetDto } from './dto/create-tweets.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tweets } from './entity/tweets.entity';
import { Users } from 'src/users/entity/users.entity';
import { response } from 'express';
import { Likes } from './entity/likes.entity';


@Injectable()
export class TweetsService {
    constructor(
        @InjectRepository(Tweets)
        private tweetsRepository: Repository<Tweets>,
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
        @InjectRepository(Likes)
        private likesRepository: Repository<Likes>,
    ) {}

    async getTweets(userId: number) {
        const tweets =  await this.tweetsRepository.find({ 
            relations: ["usuario"], 
            where: { excluido: false } 
        });


        const formattedTweets = await Promise.all(tweets.map( async (tweet) => {
            const likes = await this.getLikesCount(tweet.id);
            const liked = await this.userLikedTweet(userId, tweet.id);

            return {
                id: tweet.id,
                texto: tweet.texto,
                usuarioId: tweet.usuario.id,
                usuario: tweet.usuario.usuario,
                nome: tweet.usuario.nome,
                likes: likes, 
                liked: liked,
                comentarios: null, //TODO
                retweets: null, //TODO
                data: tweet.data_criacao,
            };
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


    async likeTweet(tweetId: number, userId: number) {
        const tweet = await this.tweetsRepository.findOne({ where: { id: tweetId } });

        if (!tweet) {
            throw new NotFoundException('Tweet não encontrado');
        }

        const user = await this.usersRepository.findOne({ where: { id: userId } });

        if (!user) {
            throw new NotFoundException('Usuário não encontrado');
        }

        const existingLike = await this.userLikedTweet(userId, tweetId) 

        if (existingLike) {
            throw new BadRequestException('Você já curtiu este tweet');
        }

        const newLike = this.likesRepository.create({ tweet, usuario: user });
        await this.likesRepository.save(newLike);

        const response = {
            status: true,
            mensagem: {
                codigo: 200,
                texto: 'Tweet curtido com sucesso!'
            },
            conteudo: true
        };

        return response;

    }

    async dislikeTweet(tweetId: number, userId: number) {

        const tweet = await this.tweetsRepository.findOne({ where: { id: tweetId } });
    
        if (!tweet) {
            throw new NotFoundException('Tweet não encontrado');
        }
    
        const user = await this.usersRepository.findOne({ where: { id: userId } });
    
        if (!user) {
            throw new NotFoundException('Usuário não encontrado');
        }

        const existingLike = await this.likesRepository.findOne({
            where: {
                tweet: { id: tweetId },
                usuario: { id: userId }
            },
            relations: ['tweet', 'usuario']
        });


    
        if (!existingLike) {
            throw new NotFoundException('Like não encontrado');
        }
    
        await this.likesRepository.remove(existingLike);
    
        const response = {
            status: true,
            mensagem: {
                codigo: 200,
                texto: 'Tweet descurtido com sucesso!'
            },
            conteudo: true
        };
    
        return response;
    }




    async getLikesCount(tweetId: number): Promise<number> {
        return this.likesRepository.count({ 
            where: { 
                tweet: { id: tweetId } 
            }
        });
    }

    async userLikedTweet(userId: number, tweetId: number): Promise<boolean> {
        const like = await this.likesRepository.findOne({ 
            where: { 
                usuario: { id: userId }, 
                tweet: { id: tweetId } 
            }
        });
        
        return like ? true : false;
    }
}
