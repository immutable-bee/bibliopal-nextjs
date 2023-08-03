/*
  Warnings:

  - The values [LIBRARY] on the enum `BUSINESSTYPE` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `paid_keywords` on the `Consumer` table. All the data in the column will be lost.
  - You are about to drop the column `paid_zips` on the `Consumer` table. All the data in the column will be lost.
  - You are about to drop the `Library` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `upload_credits` to the `Business` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "BUSINESSTYPE_new" AS ENUM ('THRIFT', 'BOOKSTORE');
ALTER TABLE "Business" ALTER COLUMN "type" TYPE "BUSINESSTYPE_new" USING ("type"::text::"BUSINESSTYPE_new");
ALTER TYPE "BUSINESSTYPE" RENAME TO "BUSINESSTYPE_old";
ALTER TYPE "BUSINESSTYPE_new" RENAME TO "BUSINESSTYPE";
DROP TYPE "BUSINESSTYPE_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "BookSale" DROP CONSTRAINT "BookSale_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Library" DROP CONSTRAINT "Library_businessId_fkey";

-- AlterTable
ALTER TABLE "BookSale" ADD COLUMN     "business_city" TEXT,
ADD COLUMN     "business_name" TEXT,
ADD COLUMN     "business_state" TEXT,
ADD COLUMN     "business_street" TEXT,
ADD COLUMN     "business_zip" TEXT,
ADD COLUMN     "email" TEXT;

-- AlterTable
ALTER TABLE "Business" ADD COLUMN     "upload_credits" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Consumer" DROP COLUMN "paid_keywords",
DROP COLUMN "paid_zips",
ALTER COLUMN "paid_alerts" SET DEFAULT 25;

-- DropTable
DROP TABLE "Library";

-- AddForeignKey
ALTER TABLE "BookSale" ADD CONSTRAINT "BookSale_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
