-- AlterTable
ALTER TABLE "Consumer" ADD COLUMN     "alerts_paused" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "email_alerts_on" BOOLEAN NOT NULL DEFAULT true;
