-- CreateTable
CREATE TABLE "Listing" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "date_listed" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "days_to_expiry" INTEGER NOT NULL DEFAULT 7,
    "title" TEXT NOT NULL,
    "isbn" TEXT,
    "author" TEXT NOT NULL,
    "format" TEXT,

    CONSTRAINT "Listing_pkey" PRIMARY KEY ("id")
);
