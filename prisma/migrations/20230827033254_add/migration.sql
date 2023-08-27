-- AlterTable
ALTER TABLE "Listing" ADD COLUMN     "booksaleId" TEXT;

-- AddForeignKey
ALTER TABLE "Listing" ADD CONSTRAINT "Listing_booksaleId_fkey" FOREIGN KEY ("booksaleId") REFERENCES "BookSale"("id") ON DELETE CASCADE ON UPDATE CASCADE;
