import { prisma } from "../../db/prismaDB";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

const handler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  if (req.method === "POST") {
    const tableData = req.body;

    let business;

    try {
      const businessRecord = await prisma.business.findUnique({
        where: { email: session.user.email },
        include: {
          library: {
            select: {
              id: true,
            },
          },
        },
      });
      business = businessRecord;
    } catch (error) {
      res.status(500).json({
        Error: "An error occured while fetching the user: " + err.message,
      });
    }

    let saleId;

    try {
      const sale = await prisma.booksale.findUnique({
        where: { ownerId: business.library.id },
      });
      saleId = sale.id;
    } catch (error) {
      res.status(500).json({
        Error: "An error occured while fetching the sale: " + err.message,
      });
    }

    const dataWithSale = tableData.map((row) => ({
      ...row,
      saleId: saleId,
    }));

    try {
      const newListings = await prisma.futurelisting.createMany({
        data: dataWithOwnerId,
      });
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

export default handler;
