-- DropForeignKey
ALTER TABLE "Comentarios" DROP CONSTRAINT "Comentarios_tweetPaiId_fkey";

-- DropForeignKey
ALTER TABLE "Likes" DROP CONSTRAINT "Likes_tweetId_fkey";

-- DropForeignKey
ALTER TABLE "Retweet" DROP CONSTRAINT "Retweet_tweetPaiId_fkey";
