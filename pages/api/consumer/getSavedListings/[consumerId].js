import { prisma } from "../../../../db/prismaDB";

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
          },
        },
      },
    });

    res.status(200).json(savedListings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default handler;
