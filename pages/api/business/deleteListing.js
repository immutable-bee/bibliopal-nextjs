import { prisma } from "../../../db/prismaDB";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

const handler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  const { listingID } = req.body;

  try {
    const listingToDelete = await prisma.listing.findUnique({
      where: { id: listingID },
    });

    if (!listingToDelete) {
      return res.status(404).json({ message: "Listing not found" });
    }

    const business = await prisma.business.findUnique({
      where: { email: session.user.email },
    });

    if (!business || listingToDelete.ownerId !== business.id) {
      return res.status(403).json({ message: "User does not own listing" });
    }

    const deleteListing = await prisma.listing.delete({
      where: { id: listingID },
    });

    res.status(200).json(deleteListing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default handler;
