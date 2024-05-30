/*
  Warnings:

  - You are about to drop the `Following_me` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Following_other` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Following_me" DROP CONSTRAINT "Following_me_sourceId_fkey";

-- DropForeignKey
ALTER TABLE "Following_me" DROP CONSTRAINT "Following_me_targetId_fkey";

-- DropForeignKey
ALTER TABLE "Following_other" DROP CONSTRAINT "Following_other_sourceId_fkey";

-- DropForeignKey
ALTER TABLE "Following_other" DROP CONSTRAINT "Following_other_targetId_fkey";

-- DropTable
DROP TABLE "Following_me";

-- DropTable
DROP TABLE "Following_other";

-- CreateTable
CREATE TABLE "Following" (
    "id" SERIAL NOT NULL,
    "sourceId" INTEGER,
    "targetId" INTEGER,
    "create_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Following_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Following" ADD CONSTRAINT "Following_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Following" ADD CONSTRAINT "Following_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
