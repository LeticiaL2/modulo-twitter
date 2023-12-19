-- Remova os dados das tabelas
DELETE FROM "Comentarios";
DELETE FROM "Retweet";

-- Adicione as colunas
ALTER TABLE "Comentarios" ADD COLUMN "usuarioId" INTEGER NOT NULL;
ALTER TABLE "Retweet" ADD COLUMN "usuarioId" INTEGER NOT NULL;

-- Adicione as chaves estrangeiras
ALTER TABLE "Comentarios" ADD CONSTRAINT "Comentarios_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Retweet" ADD CONSTRAINT "Retweet_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
