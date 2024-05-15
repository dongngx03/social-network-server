/*
  Warnings:

  - Added the required column `messageContent` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Image_post" DROP CONSTRAINT "Image_post_postId_fkey";

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "messageContent" TEXT NOT NULL,
ADD COLUMN     "read" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "sent_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Following_other" (
    "id" SERIAL NOT NULL,
    "sourceId" INTEGER,
    "targetId" INTEGER,

    CONSTRAINT "Following_other_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Following_me" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Following_me_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Following_other" ADD CONSTRAINT "Following_other_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Following_other" ADD CONSTRAINT "Following_other_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image_post" ADD CONSTRAINT "Image_post_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
