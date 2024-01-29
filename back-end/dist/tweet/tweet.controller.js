"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TweetController = void 0;
const common_1 = require("@nestjs/common");
let TweetController = class TweetController {
    constructor() {
        this.tweets = [];
    }
    getAllTweets() {
        return this.tweets;
    }
    createTweet(tweet, res) {
        const newTweet = {
            id: this.tweets.length + 1,
            message: tweet.message,
            likes: 0,
        };
        this.tweets.push(newTweet);
        res.status(common_1.HttpStatus.CREATED).send();
        return newTweet;
    }
    deleteTweet(id, res) {
        const tweetId = parseInt(id);
        const index = this.tweets.findIndex((tweet) => tweet.id === tweetId);
        this.tweets[index].message = '';
        res.status(common_1.HttpStatus.NO_CONTENT).send();
    }
    getTweetById(id) {
        const tweetId = parseInt(id);
        const tweet = this.tweets.find((tweet) => tweet.id === tweetId);
        return tweet;
    }
    likeTweet(id, res) {
        const tweetId = parseInt(id);
        const tweet = this.tweets.find((tweet) => tweet.id === tweetId);
        tweet.likes++;
        res.status(common_1.HttpStatus.NO_CONTENT).send();
        return;
    }
    unlikeTweet(id, res) {
        const tweetId = parseInt(id);
        const tweet = this.tweets.find((tweet) => tweet.id === tweetId);
        tweet.likes--;
        res.status(common_1.HttpStatus.NO_CONTENT).send();
        return;
    }
};
exports.TweetController = TweetController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], TweetController.prototype, "getAllTweets", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], TweetController.prototype, "createTweet", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TweetController.prototype, "deleteTweet", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Object)
], TweetController.prototype, "getTweetById", null);
__decorate([
    (0, common_1.Post)(':id/like'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Object)
], TweetController.prototype, "likeTweet", null);
__decorate([
    (0, common_1.Delete)(':id/like'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Object)
], TweetController.prototype, "unlikeTweet", null);
exports.TweetController = TweetController = __decorate([
    (0, common_1.Controller)('api/tweets')
], TweetController);
//# sourceMappingURL=tweet.controller.js.map