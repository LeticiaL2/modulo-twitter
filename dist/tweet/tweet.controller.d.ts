import { Response } from 'express';
export declare class TweetController {
    private tweets;
    private findTweetById;
    getAllTweets(): {
        id: number;
        message: string;
    }[];
    createTweet(tweet: {
        message: string;
    }, res: Response): {
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
