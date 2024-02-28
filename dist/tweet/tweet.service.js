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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TweetService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let TweetService = class TweetService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createTweet(message, userId) {
        return this.prisma.tweet.create({
            data: {
                message,
                likes: 0,
                userId,
            },
        });
    }
    async getAllTweets() {
        return this.prisma.tweet.findMany();
    }
    async deleteTweet(id) {
        return this.prisma.tweet.delete({
            where: { id },
        });
    }
    async getTweetById(id) {
        return this.prisma.tweet.findUnique({
            where: { id },
        });
    }
    async likeTweet(id) {
        return this.prisma.tweet.update({
            where: { id },
            data: { likes: { increment: 1 } },
        });
    }
    async unlikeTweet(id) {
        return this.prisma.tweet.update({
            where: { id },
            data: { likes: { decrement: 1 } },
        });
    }
    async retweetTweet(message, userId, retweetOf) {
        const data = {
            message,
            likes: 0,
            userId,
            retweetOf,
        };
        return this.prisma.tweet.create({
            data,
        });
    }
};
exports.TweetService = TweetService;
exports.TweetService = TweetService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TweetService);
//# sourceMappingURL=tweet.service.js.map