/*
  Warnings:

  - A unique constraint covering the columns `[consumerId,author]` on the table `Alert` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Alert_consumerId_author_key" ON "Alert"("consumerId", "author");
