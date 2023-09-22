import { prisma } from "../../../../db/prismaDB";

const handler = async (req, res) => {
  const { storeId } = req.query;

  try {
    const business = await prisma.business.findUnique({
      where: { id: storeId },
    });

    const listings = await prisma.listing.findMany({
      where: { ownerId: storeId },
    });

    res.status(200).json({ data: business, listings: listings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default handler;
