import { prisma } from "../../../db/prismaDB";
import * as notify from "../notifier/notify";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { consumerId, listingId } = req.body;

  try {
    const savedListing = await prisma.savedListing.create({
      data: {
        consumerId: consumerId,
        listingId: listingId,
      },
    });

    res.status(200).json({
      message: `Listing: ${listingId}, Saved by Consumer: ${consumerId} `,
    });
  } catch (error) {
    notify.error(error);
    res.status(500).json({ message: error.message });
  }
};

export default handler;
