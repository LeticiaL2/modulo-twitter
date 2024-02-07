import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { UserFromJwt } from 'src/auth/models/UserFromJwt';
export declare class TweetController {
    private readonly jwtService;
    private tweets;
    private findTweetById;
    private getUserIdFromToken;
    constructor(jwtService: JwtService);
    getAllTweets(user: UserFromJwt): Promise<any>;
    createTweet(tweet: {
        message: string;
    }, req: Request, res: Response): {
        id: number;
        message: string;
        likes: number;
    };
    deleteTweet(id: string, res: Response): void;
    getTweetById(id: string): {
        id: number;
        message: string;
        likes: number;
    };
    likeTweet(id: string, res: Response): void;
    unlikeTweet(id: string, res: Response): void;
}
