-- CreateTable
CREATE TABLE "Notifycation" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "content" TEXT NOT NULL,

    CONSTRAINT "Notifycation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Notifycation" ADD CONSTRAINT "Notifycation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
