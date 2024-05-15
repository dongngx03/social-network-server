-- AlterTable
ALTER TABLE "Following_me" ADD COLUMN     "create_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "sourceId" INTEGER,
ADD COLUMN     "targetId" INTEGER;

-- AlterTable
ALTER TABLE "Following_other" ADD COLUMN     "create_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "websoket" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "soketId" TEXT NOT NULL,
    "create_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "websoket_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "websoket_soketId_key" ON "websoket"("soketId");

-- AddForeignKey
ALTER TABLE "websoket" ADD CONSTRAINT "websoket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Following_me" ADD CONSTRAINT "Following_me_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Following_me" ADD CONSTRAINT "Following_me_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
