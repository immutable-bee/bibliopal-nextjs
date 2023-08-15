import { prisma } from "../../db/prismaDB";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const listings = await prisma.listing.findMany({
        include: { owner: true },
      });
      res.status(200).json(listings);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

export default handler;
