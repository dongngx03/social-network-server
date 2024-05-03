/*
  Warnings:

  - A unique constraint covering the columns `[idAuth]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `idAuth` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status_Friend" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- CreateEnum
CREATE TYPE "Status_Like_Post" AS ENUM ('TRUE', 'FALSE');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "idAuth" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Friend_request" (
    "id" SERIAL NOT NULL,
    "sourceId" INTEGER,
    "targetId" INTEGER,
    "status" "Status_Friend" NOT NULL,

    CONSTRAINT "Friend_request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "sourceId" INTEGER,
    "postContent" TEXT NOT NULL,
    "post_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Like_post" (
    "id" SERIAL NOT NULL,
    "postId" INTEGER,
    "sourceId" INTEGER,
    "status" "Status_Like_Post" NOT NULL,

    CONSTRAINT "Like_post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image_post" (
    "id" SERIAL NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "postId" INTEGER,
    "created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Image_post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "postId" INTEGER,
    "sourceId" INTEGER,
    "commentContent" TEXT NOT NULL,
    "parentCommentId" INTEGER DEFAULT 0,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Like_comment" (
    "id" SERIAL NOT NULL,
    "commentId" INTEGER,
    "sourceId" INTEGER,
    "status" "Status_Like_Post" NOT NULL,

    CONSTRAINT "Like_comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "senderId" INTEGER,
    "receiverId" INTEGER,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_idAuth_key" ON "User"("idAuth");

-- AddForeignKey
ALTER TABLE "Friend_request" ADD CONSTRAINT "Friend_request_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friend_request" ADD CONSTRAINT "Friend_request_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like_post" ADD CONSTRAINT "Like_post_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like_post" ADD CONSTRAINT "Like_post_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image_post" ADD CONSTRAINT "Image_post_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like_comment" ADD CONSTRAINT "Like_comment_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like_comment" ADD CONSTRAINT "Like_comment_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
