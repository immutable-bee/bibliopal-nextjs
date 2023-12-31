import { prisma } from "../../../db/prismaDB";
import uploadLimitChecker from "../middleware/uploadLimitChecker";
import * as notify from "../notifier/notify";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { data: tableData, daysToExpiry } = req.body;
    const businessData = req.businessData;
    const ownerId = businessData.id;
    const memberCreditsCost = businessData.memberCreditsCost;
    const paidCreditsCost = businessData.paidCreditsCost;

    const existingISBNs = await prisma.listing.findMany({
      where: { ownerId: ownerId },
      select: { isbn: true },
    });

    const existingISBNSet = new Set(
      existingISBNs.map((listing) => listing.isbn)
    );

    const uniqueListings = tableData.filter(
      (listing) => !existingISBNSet.has(listing.isbn)
    );

    const dataWithOwnerId = uniqueListings.map((row) => ({
      ...row,
      ownerId: ownerId,
      days_to_expiry: daysToExpiry,
    }));

    try {
      const [newListings, creditUpdate] = await prisma.$transaction([
        prisma.listing.createMany({
          data: dataWithOwnerId,
        }),
        prisma.business.update({
          where: { id: ownerId },
          data: {
            current_cycle_uploads: {
              increment: memberCreditsCost,
            },
            upload_credits: {
              decrement: paidCreditsCost,
            },
          },
        }),
      ]);

      res.status(200).json({ message: "Listings created successfully" });
    } catch (error) {
      notify.error(error);
      res.status(500).json({
        message: "An error occured while uploading listings: " + error.message,
      });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

export default uploadLimitChecker(handler);
