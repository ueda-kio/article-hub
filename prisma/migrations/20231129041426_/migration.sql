/*
  Warnings:

  - You are about to drop the `VerificationRequest` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Site" AS ENUM ('qiita', 'zenn');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "qiita" TEXT,
ADD COLUMN     "zenn" TEXT;

-- DropTable
DROP TABLE "VerificationRequest";

-- CreateTable
CREATE TABLE "Article" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "likes_count" INTEGER NOT NULL,
    "site" "Site" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "publish" BOOLEAN NOT NULL,
    "creatorId" TEXT NOT NULL,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
