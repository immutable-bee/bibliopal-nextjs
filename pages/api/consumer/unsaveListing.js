import { prisma } from "../../../db/prismaDB";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { consumerId, listingId } = req.body;

  try {
    const unsaveListing = await prisma.savedListing.delete({
      where: {
        consumerId_listingId: {
          consumerId: consumerId,
          listingId: listingId,
        },
      },
    });

    res.status(200).json({
      message: `Listing: ${listingId}, unsaved by Consumer: ${consumerId} `,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default handler;
