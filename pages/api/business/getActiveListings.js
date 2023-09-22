import { prisma } from "../../../db/prismaDB";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

const handler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  try {
    const business = await prisma.business.findUnique({
      where: { email: session.user.email },
    });

    const listings = await prisma.listing.findMany({
      where: { ownerId: business.id },
    });

    res.status(200).json(listings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default handler;
