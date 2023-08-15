import { prisma } from "../../../db/prismaDB";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";

const handler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  try {
    const business = await prisma.business.findUnique({
      where: { email: session.user.email },
    });
    const deleteListings = await prisma.listing.deleteMany({
      where: { ownerId: business.id },
    });
    if (business.bookSale) {
      const deleteBookSale = await prisma.bookSale.delete({
        where: { ownerId: business.id },
      });
    }
    res.status(200).json({ message: "Inventory Reset!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default handler;
