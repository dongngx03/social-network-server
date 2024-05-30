-- DropForeignKey
ALTER TABLE "Following" DROP CONSTRAINT "Following_sourceId_fkey";

-- DropForeignKey
ALTER TABLE "Following" DROP CONSTRAINT "Following_targetId_fkey";

-- AddForeignKey
ALTER TABLE "Following" ADD CONSTRAINT "Following_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Following" ADD CONSTRAINT "Following_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
