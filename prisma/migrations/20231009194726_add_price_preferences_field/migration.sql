-- AlterTable
ALTER TABLE "Business" ADD COLUMN     "pricePreferences" TEXT[] DEFAULT ARRAY['all']::TEXT[];
