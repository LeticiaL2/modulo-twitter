import { BadRequestException, ConsoleLogger, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tweet } from './entity/tweet.entity';
import { User } from 'src/users/entity/user.entity';
import { response } from 'express';
import { Like } from './entity/like.entity';
import { Comment } from './entity/comment.entity';
import { Retweet } from './entity/retweet.entity';
import { identity } from 'rxjs';
import { exit } from 'process';
import { getSystemErrorMap } from 'util';


@Injectable()
export class TweetsService {
    constructor(
        @InjectRepository(Tweet)
        private tweetsRepository: Repository<Tweet>,
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        @InjectRepository(Like)
        private likesRepository: Repository<Like>,
        @InjectRepository(Comment)
        private commentsRepository: Repository<Comment>,
        @InjectRepository(Retweet)
        private retweetsRepository: Repository<Retweet>,
    ) {}

    async getTweets(userId: number) {

        const tweets = await this.tweetsRepository
            // dados tweet original
            .createQueryBuilder("tweet")
            .leftJoinAndSelect('tweet.usuario', 'usuario')
            .leftJoinAndSelect('tweet.likes', 'like')
            .leftJoinAndSelect('like.usuario', 'likeUsuario')
            .leftJoinAndSelect('tweet.comentarios', 'comentario')
            // dados tweetPai do retweet
            .leftJoinAndSelect("tweet.rtwTweet", "rwtTweet")
            .leftJoinAndSelect("rwtTweet.tweetPai", "tweetPaiDoRetweet")
            .leftJoinAndSelect("tweetPaiDoRetweet.likes", "likesTweetPaiDoRetweet")
            .leftJoinAndSelect("tweetPaiDoRetweet.comentarios", "commentsDoTweetPaiDoRetweet")
            .leftJoinAndSelect("tweetPaiDoRetweet.usuario", "usuarioTweetPaiDoRetweet")
            .leftJoinAndSelect("tweetPaiDoRetweet.retweets", "retweetsDoTweetPaiDoRetweet")
            // isso eh pro retuitado
            .leftJoinAndSelect("retweetsDoTweetPaiDoRetweet.retweet", "retweetDoTweetPaiDoRetweet")
            .leftJoinAndSelect("retweetDoTweetPaiDoRetweet.usuario", "usuarioDoRetweetDoTweetPaiDoRetweet")
            // dados dos retweets do tweetPai
            .leftJoinAndSelect("tweet.retweets", "retweet")
            .leftJoinAndSelect("retweet.retweet", "tweetPai")
            //.leftJoinAndSelect("tweetPai.retweets", "retweetsDoTweetPai")
            .leftJoinAndSelect("tweetPai.likes", "likesDoTweetPai")
            .leftJoinAndSelect("tweetPai.comentarios", "commentsDoTweetPai")
            .leftJoinAndSelect("tweetPai.usuario", "usuarioDoTweetPai")
            // filtros
            .orderBy('tweet.data_criacao', 'DESC')
            .where("tweet.excluido = :excluido", { excluido: false })
            .andWhere("tweet.id NOT IN (SELECT tweetId FROM Comentarios)")
            .orderBy('tweet.data_criacao', 'DESC')
            .getMany()
        ;


        // console.log('Retweet:', tweets[0])
        // console.log('TweetPai do Retweet: ', tweets[0].rtwTweet[0]);
        // console.log('--------------------------------------------------------------------------------')
        // console.log('TweetPai: ', tweets[1])
        // console.log('Retweets do TweetPai: ', tweets[1].retweets[0]);
        // process.exit();
    

        const formattedTweets = await Promise.all(tweets.map( async (tweet) => {

            try {
                return {
                    id: tweet.id,
                    texto: tweet.texto,
                    usuarioId: tweet.usuario.id,
                    usuario: tweet.usuario.usuario,
                    nome: tweet.usuario.nome,
                    likes: tweet.likes.length,
                    liked: tweet.likes.some(like => like.usuario.id === userId),
                    comentarios: tweet.comentarios.length,
                    retweets: tweet.retweets.length,
                    retuitado: tweet.retweets.some(retweet => retweet.retweet.usuario.id === userId),
                    data: tweet.data_criacao,
                    idRetweet: null, //id do retweet ja esta no id do tweetPai
                    tweetPai: tweet.rtwTweet[0]?.tweetPai ? (tweet.rtwTweet[0].tweetPai.excluido ? 
                        { texto: "Esse Tweet está indisponível" } : 
                        {
                        id: tweet.rtwTweet[0].tweetPai.id,
                        texto: tweet.rtwTweet[0].tweetPai.texto,
                        usuarioId: tweet.rtwTweet[0].tweetPai.usuario.id,
                        usuario: tweet.rtwTweet[0].tweetPai.usuario.usuario,
                        nome: tweet.rtwTweet[0].tweetPai.usuario.nome,
                        likes: tweet.rtwTweet[0].tweetPai.likes.length,
                        liked: tweet.rtwTweet[0].tweetPai.likes.some(like => like.usuario.id === userId), // falta isso na arquitetura?
                        comentarios: tweet.rtwTweet[0].tweetPai.comentarios.length,
                        retweets: tweet.rtwTweet[0].tweetPai.retweets.length,
                        retuitado: tweet.rtwTweet[0].tweetPai.retweets.some(retweet => retweet.retweet.usuario.id === userId),
                        data: tweet.rtwTweet[0].tweetPai.data_criacao
                    }) : null,
                };
            } catch (error) {
                console.error('Error while setting up return object:', error);
                console.log('tweet:', tweet);
                process.exit();
            }
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

        const tweet = await this.tweetsRepository.createQueryBuilder('tweet')
        .leftJoinAndSelect('tweet.usuario', 'usuario')
        .leftJoinAndSelect('tweet.rtwTweet', 'rtwTweet')
        .leftJoinAndSelect('rtwTweet.tweetPai', 'tweetPai')
        .where('tweet.id = :id', { id })
        .getOne();

        if (!tweet || tweet.excluido) {
            throw new NotFoundException('Tweet não encontrado');
        }

        if (tweet.usuario.id !== userId) {
            throw new UnauthorizedException('Você não tem permissão para excluir este tweet');
        }

        // Se o tweet é um retweet, decrementa o contador de retweets do TweetPai
        if (tweet.rtwTweet && tweet.rtwTweet.length > 0 && tweet.rtwTweet[0].tweetPai) {

            const tweetPai = await this.tweetsRepository.findOne({ 
                where: { id: tweet.rtwTweet[0].tweetPai.id },
                relations: ["retweets", "retweets.retweet"],
            });
            
            if (tweetPai) {
                tweetPai.retweets = tweetPai.retweets.filter(retweet => retweet.retweet.id !== tweet.id);
                await this.tweetsRepository.save(tweetPai);
            }
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

        const existingLike = await this.likesRepository.findOne({ 
            where: { 
                usuario: { id: userId }, 
                tweet: { id: tweetId } 
            }
        });

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
    
        const newTweet = this.tweetsRepository.create({ ...createTweetDto, usuario: user });
        await this.tweetsRepository.save(newTweet);
    
        const newComment = this.commentsRepository.create({ tweetPai, comentario: newTweet });
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

        //console.log(tweet);
        
    
        if (!tweet) {
            throw new NotFoundException('Tweet não encontrado');
        }
    
        const comments = await this.commentsRepository.find({ 
            where: { 
                tweetPai: { id: tweetId },
            },
            relations: ['comentario', 'comentario.usuario'],
        });

        //console.log(comments);
    
        const formattedComments = await Promise.all(comments.map(async comment => {

            const likesCount = await this.getLikesCount(comment.comentario.id);
            const commentsCount = await this.getCommentsCount(comment.comentario.id);
            const retweetsCount = await this.getRetweetsCount(comment.comentario.id);

            //console.log(comment);

            
            return {
                id: comment.comentario.id,
                texto: comment.comentario.texto,
                usuarioId: comment.comentario.usuario.id,
                usuario: comment.comentario.usuario.usuario,
                nome: comment.comentario.usuario.nome,
                likes: likesCount,
                comentarios: commentsCount,
                retweets: retweetsCount,
                data: comment.comentario.data_criacao
            };
        }));


        const likesCount = await this.getLikesCount(tweet.id);
        const commentsCount = await this.getCommentsCount(tweet.id);
        const retweetsCount = await this.getRetweetsCount(tweet.id);
    
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
                retweets: retweetsCount,
                data: tweet.data_criacao
            }
        };

        //console.log(response)
    
        return response;
    }
    



    async postRetweet(tweetId: number, createTweetDto: CreateTweetDto, userId: number) {
        
        const tweetPai = await this.tweetsRepository.findOne({ where: { id: tweetId } });
    
        if (!tweetPai) {
            throw new NotFoundException('Tweet não encontrado');
        }
    
        const user = await this.usersRepository.findOne({ where: { id: userId } });
    
        if (!user) {
            throw new NotFoundException('Usuário não encontrado');
        }
    
        const newTweet = this.tweetsRepository.create({ ...createTweetDto, usuario: user });
        await this.tweetsRepository.save(newTweet);
    
        const newRetweet = this.retweetsRepository.create({ tweetPai, retweet: newTweet });
        await this.retweetsRepository.save(newRetweet);
    
        const response = {
            status: true,
            mensagem: {
                codigo: 201,
                texto: 'Retweet realizado com sucesso!'
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
    

    // Usada na getTweetDetails, passar para la
    async getLikesCount(tweetId: number): Promise<number> {
        return this.likesRepository.count({ 
            where: { 
                tweet: { id: tweetId } 
            }
        });
    }

    // Usada na getTweetDetails, passar para la
    async getCommentsCount(tweetId: number): Promise<number> {
        return this.commentsRepository.count({ 
            where: { 
                tweetPai: { id: tweetId } 
            }
        });
    }


    // Usada na getTweetDetails, passar para la
    async getRetweetsCount(tweetId: number): Promise<number> {
        return this.retweetsRepository.count({ 
            where: { 
                tweetPai: { id: tweetId } 
            }
        });
    }

    // Nao utilizada, talvez util
    // async userRetweetedTweet(userId: number, tweetId: number) {
    //     const retweet = await this.retweetsRepository.createQueryBuilder("retweet")
    //         .where("retweet.tweetId = :tweetId", { tweetId })
    //         .andWhere("retweet.usuarioId = :userId", { userId })
    //         .getOne();
    
    //     return !!retweet;
    // }
}
