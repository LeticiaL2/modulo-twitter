import { Response, Request } from 'express';
import { AuthService } from 'src/auth/auth.service';
export declare class TweetController {
    private readonly authService;
    private tweets;
    private findTweetById;
    constructor(authService: AuthService);
    getAllTweets(): Promise<any>;
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
    retweetTweet(id: string, res: Response, req: Request): void;
}
