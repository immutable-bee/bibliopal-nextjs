-- DropForeignKey
ALTER TABLE "BookSale" DROP CONSTRAINT "BookSale_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "FutureListing" DROP CONSTRAINT "FutureListing_saleId_fkey";

-- DropForeignKey
ALTER TABLE "Listing" DROP CONSTRAINT "Listing_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "SavedListing" DROP CONSTRAINT "SavedListing_consumerId_fkey";

-- DropForeignKey
ALTER TABLE "SavedListing" DROP CONSTRAINT "SavedListing_listingId_fkey";

-- CreateTable
CREATE TABLE "Match" (
    "id" TEXT NOT NULL,
    "consumerId" TEXT NOT NULL,
    "listingId" TEXT NOT NULL,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Match_consumerId_listingId_key" ON "Match"("consumerId", "listingId");

-- AddForeignKey
ALTER TABLE "Listing" ADD CONSTRAINT "Listing_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Business"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedListing" ADD CONSTRAINT "SavedListing_consumerId_fkey" FOREIGN KEY ("consumerId") REFERENCES "Consumer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedListing" ADD CONSTRAINT "SavedListing_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_consumerId_fkey" FOREIGN KEY ("consumerId") REFERENCES "Consumer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FutureListing" ADD CONSTRAINT "FutureListing_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "BookSale"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookSale" ADD CONSTRAINT "BookSale_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Business"("id") ON DELETE CASCADE ON UPDATE CASCADE;
