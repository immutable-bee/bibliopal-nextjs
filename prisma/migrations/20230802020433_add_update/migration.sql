/*
  Warnings:

  - You are about to drop the column `onSale` on the `Listing` table. All the data in the column will be lost.
  - Added the required column `business_name` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Made the column `business_state` on table `Business` required. This step will fail if there are existing NULL values in that column.
  - Made the column `business_city` on table `Business` required. This step will fail if there are existing NULL values in that column.
  - Made the column `business_street` on table `Business` required. This step will fail if there are existing NULL values in that column.
  - Made the column `business_zip` on table `Business` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "MEMBERSHIP" AS ENUM ('FREE', 'BASIC', 'PREMIUM');

-- AlterTable
ALTER TABLE "Business" ADD COLUMN     "business_name" TEXT NOT NULL,
ADD COLUMN     "current_cycle_uploads" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "is_approved" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "membership" "MEMBERSHIP" NOT NULL DEFAULT 'FREE',
ADD COLUMN     "upload_cycle_start_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "business_state" SET NOT NULL,
ALTER COLUMN "business_city" SET NOT NULL,
ALTER COLUMN "business_street" SET NOT NULL,
ALTER COLUMN "business_zip" SET NOT NULL;

-- AlterTable
ALTER TABLE "Listing" DROP COLUMN "onSale";

-- CreateTable
CREATE TABLE "SavedListing" (
    "id" TEXT NOT NULL,
    "consumerId" TEXT NOT NULL,
    "listingId" TEXT NOT NULL,

    CONSTRAINT "SavedListing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FutureListing" (
    "id" TEXT NOT NULL,
    "saleId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "isbn" TEXT,
    "author" TEXT NOT NULL,
    "format" TEXT,
    "image_url" TEXT,

    CONSTRAINT "FutureListing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Library" (
    "id" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "business_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "business_state" TEXT NOT NULL,
    "business_city" TEXT NOT NULL,
    "business_street" TEXT NOT NULL,
    "business_zip" TEXT NOT NULL,
    "url" TEXT,
    "phone_number" TEXT,

    CONSTRAINT "Library_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookSale" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "date_starts" TIMESTAMP(3) NOT NULL,
    "date_ends" TIMESTAMP(3) NOT NULL,
    "hours" TEXT,

    CONSTRAINT "BookSale_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SavedListing_consumerId_listingId_key" ON "SavedListing"("consumerId", "listingId");

-- CreateIndex
CREATE UNIQUE INDEX "Library_businessId_key" ON "Library"("businessId");

-- CreateIndex
CREATE UNIQUE INDEX "BookSale_ownerId_key" ON "BookSale"("ownerId");

-- AddForeignKey
ALTER TABLE "SavedListing" ADD CONSTRAINT "SavedListing_consumerId_fkey" FOREIGN KEY ("consumerId") REFERENCES "Consumer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedListing" ADD CONSTRAINT "SavedListing_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FutureListing" ADD CONSTRAINT "FutureListing_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "BookSale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Library" ADD CONSTRAINT "Library_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookSale" ADD CONSTRAINT "BookSale_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Library"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
