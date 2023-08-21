import { prisma } from "../../../db/prismaDB";
import uploadLimitChecker from "../middleware/uploadLimitChecker";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { data: tableData, daysToExpiry } = req.body;
    const businessData = req.businessData;
    const ownerId = businessData.id;
    const memberCreditsCost = businessData.memberCreditsCost;
    const paidCreditsCost = businessData.paidCreditsCost;

    const dataWithOwnerId = tableData.map((row) => ({
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
      res.status(500).json({
        message: "An error occured while uploading listings: " + error.message,
      });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

export default uploadLimitChecker(handler);
