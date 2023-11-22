-- DropForeignKey
ALTER TABLE "Comentarios" DROP CONSTRAINT "Comentarios_tweetPaiId_fkey";

-- AlterTable
ALTER TABLE "Comentarios" ALTER COLUMN "tweetPaiId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Comentarios" ADD CONSTRAINT "Comentarios_tweetId_fkey" FOREIGN KEY ("tweetId") REFERENCES "Tweet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comentarios" ADD CONSTRAINT "Comentarios_tweetPaiId_fkey" FOREIGN KEY ("tweetPaiId") REFERENCES "Tweet"("id") ON DELETE SET NULL ON UPDATE CASCADE;
