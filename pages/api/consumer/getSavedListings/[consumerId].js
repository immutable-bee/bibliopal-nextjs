import { prisma } from "../../../../db/prismaDB";
import * as notify from "../../notifier/notify";

const handler = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { consumerId } = req.query;

  try {
    const savedListings = await prisma.savedListing.findMany({
      where: { consumerId: consumerId },
      include: {
        listing: {
          include: {
            owner: true,
            booksale: true,
          },
        },
      },
    });

    res.status(200).json(savedListings);
  } catch (error) {
    notify.error(error);
    res.status(500).json({ message: error.message });
  }
};

export default handler;
