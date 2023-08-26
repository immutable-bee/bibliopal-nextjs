/*
  Warnings:

  - Added the required column `reason` to the `Match` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ALERTREASON" AS ENUM ('TITLE', 'AUTHOR');

-- AlterTable
ALTER TABLE "Match" ADD COLUMN     "reason" "ALERTREASON" NOT NULL;
