import { HttpStatus } from '@nestjs/common';
export declare class TweetController {
    private tweets;
    getAllTweets(): {
        id: number;
        message: string;
    }[];
    createTweet(tweet: {
        message: string;
    }): {
        id: number;
        message: string;
    };
    deleteTweet(id: string): HttpStatus;
}
