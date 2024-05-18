/*
  Warnings:

  - Added the required column `type` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TypeMessage" AS ENUM ('TEXT', 'IMAGE');

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "type" "TypeMessage" NOT NULL;
