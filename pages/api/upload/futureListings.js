import { prisma } from "../../../db/prismaDB";
import uploadLimitChecker from "../middleware/uploadLimitChecker";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const tableData = req.body;
    const businessData = req.businessData;
    const ownerId = businessData.businessId;
    const memberCreditsCost = businessData.memberCreditsCost;
    const paidCreditsCost = businessData.paidCreditsCost;

    let saleId;

    try {
      const sale = await prisma.booksale.findUnique({
        where: { ownerId: ownerId },
      });
      saleId = sale.id;
    } catch (error) {
      res.status(500).json({
        Error: "An error occured while fetching the sale: " + error.message,
      });
    }

    const dataWithSale = tableData.map((row) => ({
      ...row,
      saleId: saleId,
    }));

    try {
      const [newListings, creditUpdate] = await prisma.$transaction([
        prisma.futurelisting.createMany({
          data: dataWithSale,
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
