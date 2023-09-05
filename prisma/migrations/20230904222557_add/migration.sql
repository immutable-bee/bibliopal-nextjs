-- AlterTable
ALTER TABLE "Consumer" ADD COLUMN     "isbnAlerts" TEXT[];

-- CreateTable
CREATE TABLE "Alerts" (
    "id" TEXT NOT NULL,
    "consumerId" TEXT NOT NULL,
    "title" TEXT,
    "author" TEXT,
    "isbn" TEXT,

    CONSTRAINT "Alerts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Alerts_title_author_key" ON "Alerts"("title", "author");

-- CreateIndex
CREATE UNIQUE INDEX "Alerts_consumerId_isbn_key" ON "Alerts"("consumerId", "isbn");

-- AddForeignKey
ALTER TABLE "Alerts" ADD CONSTRAINT "Alerts_consumerId_fkey" FOREIGN KEY ("consumerId") REFERENCES "Consumer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
