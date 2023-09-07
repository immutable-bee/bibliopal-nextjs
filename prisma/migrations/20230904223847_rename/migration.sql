/*
  Warnings:

  - You are about to drop the `Alerts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Alerts" DROP CONSTRAINT "Alerts_consumerId_fkey";

-- DropTable
DROP TABLE "Alerts";

-- CreateTable
CREATE TABLE "Alert" (
    "id" TEXT NOT NULL,
    "consumerId" TEXT NOT NULL,
    "title" TEXT,
    "author" TEXT,
    "isbn" TEXT,

    CONSTRAINT "Alert_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Alert_title_author_key" ON "Alert"("title", "author");

-- CreateIndex
CREATE UNIQUE INDEX "Alert_consumerId_isbn_key" ON "Alert"("consumerId", "isbn");

-- AddForeignKey
ALTER TABLE "Alert" ADD CONSTRAINT "Alert_consumerId_fkey" FOREIGN KEY ("consumerId") REFERENCES "Consumer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
