-- CreateTable
CREATE TABLE "Tweet" (
    "id" SERIAL NOT NULL,
    "texto" VARCHAR(280) NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "likes" INTEGER NOT NULL,
    "comentarios" INTEGER NOT NULL,
    "retweets" INTEGER NOT NULL,
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tweet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Tweet" ADD CONSTRAINT "Tweet_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
