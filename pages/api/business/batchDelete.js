import { prisma } from "../../../db/prismaDB";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

const handler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  const { listingIds } = req.body;

  try {
    if (!Array.isArray(listingIds)) {
      return res.status(400).json({ message: "Invalid request format." });
    }

    const business = await prisma.business.findUnique({
      where: { email: session.user.email },
    });

    if (!business) {
      return res.status(404).json({ message: "Business not found" });
    }

    const listings = await prisma.listing.findMany({
      where: {
        id: {
          in: listingIds,
        },
      },
    });

    for (let listing of listings) {
      if (listing.ownerId !== business.id) {
        return res
          .status(403)
          .json({
            message:
              "You don't have permission to delete one or more listings.",
          });
      }
    }

    const result = await prisma.listing.deleteMany({
      where: {
        id: {
          in: listingIds,
        },
      },
    });

    res.status(200).json({ deletedCount: result.count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default handler;
