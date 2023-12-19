import { BadRequestException, ConsoleLogger, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateTweetDto } from './dto/create-tweets.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tweets } from './entity/tweets.entity';
import { Users } from 'src/users/entity/users.entity';
import { response } from 'express';
import { Likes } from './entity/likes.entity';
import { Comments } from './entity/comments.entity';


@Injectable()
export class TweetsService {
    constructor(
        @InjectRepository(Tweets)
        private tweetsRepository: Repository<Tweets>,
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
        @InjectRepository(Likes)
        private likesRepository: Repository<Likes>,
        @InjectRepository(Comments)
        private commentsRepository: Repository<Comments>,
    ) {}

    async getTweets(userId: number) {
        const tweets =  await this.tweetsRepository.find({ 
            relations: ["usuario"], 
            where: { excluido: false } 
        });


        const formattedTweets = await Promise.all(tweets.map( async (tweet) => {
            const likesCount = await this.getLikesCount(tweet.id);
            const liked = await this.userLikedTweet(userId, tweet.id);
            const commentsCount = await this.getCommentsCount(tweet.id);

            return {
                id: tweet.id,
                texto: tweet.texto,
                usuarioId: tweet.usuario.id,
                usuario: tweet.usuario.usuario,
                nome: tweet.usuario.nome,
                likes: likesCount, 
                liked: liked,
                comentarios: commentsCount,
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


    async postComment(tweetId: number, createTweetDto: CreateTweetDto, userId: number) {
        const tweetPai = await this.tweetsRepository.findOne({ where: { id: tweetId } });
    
        if (!tweetPai) {
            throw new NotFoundException('Tweet não encontrado');
        }
    
        const user = await this.usersRepository.findOne({ where: { id: userId } });
    
        if (!user) {
            throw new NotFoundException('Usuário não encontrado');
        }
    
        // Crie um novo tweet para o comentário
        const newTweet = this.tweetsRepository.create({ ...createTweetDto, usuario: user });
        await this.tweetsRepository.save(newTweet);
    
        // Crie uma nova entrada na tabela de comentários
        const newComment = this.commentsRepository.create({ tweetPai, tweet: newTweet });
        await this.commentsRepository.save(newComment);
    
        const response = {
            status: true,
            mensagem: {
                codigo: 201,
                texto: 'Comentário criado com sucesso!'
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
    

    async getTweetDetails(tweetId: number) {

        const tweet = await this.tweetsRepository.findOne({ 
            where: { id: tweetId },
            relations: ['usuario']
        });
        
    
        if (!tweet) {
            throw new NotFoundException('Tweet não encontrado');
        }
    
        const comments = await this.commentsRepository.find({ 
            where: { 
                tweetPai: { id: tweetId },
            },
            relations: ['tweetPai', 'tweet', 'tweet.usuario'],
        });
    
        const formattedComments = await Promise.all(comments.map(async comment => {
            const likesCount = await this.getLikesCount(comment.tweet.id);
            const commentsCount = await this.getCommentsCount(comment.tweet.id);
            
        
            return {
                id: comment.tweet.id,
                texto: comment.tweet.texto,
                usuarioId: comment.tweet.usuario.id,
                usuario: comment.tweet.usuario.usuario,
                nome: comment.tweet.usuario.nome,
                likes: likesCount,
                comentarios: commentsCount,
                retweets: 0, //TODO
                data: comment.tweet.data_criacao
            };
        }));


        const likesCount = await this.getLikesCount(tweet.id);
        const commentsCount = await this.getCommentsCount(tweet.id);
    
        const response = {
            status: true,
            mensagem: {
                codigo: 200,
                texto: 'Detalhes do tweet recuperados com sucesso!'
            },
            conteudo: {
                id: tweet.id,
                texto: tweet.texto,
                usuarioId: tweet.usuario.id,
                usuario: tweet.usuario.usuario,
                nome: tweet.usuario.nome,
                likes: likesCount,
                comentarios: commentsCount,
                comentariosLista: formattedComments,
                retweets: 0, //TODO
                data: tweet.data_criacao
            }
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

    async getCommentsCount(tweetId: number): Promise<number> {
        return this.commentsRepository.count({ 
            where: { 
                tweetPai: { id: tweetId } 
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
