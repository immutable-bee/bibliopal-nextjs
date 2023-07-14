import { prisma } from "../../db/prismaDB";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { searchTerm, filter } = req.body;

    const searchCondition = {
      [filter]: {
        contains: searchTerm,
        mode: "insensitive",
      },
    };

    try {
      const searchResults = await prisma.listing.findMany({
        where: { ...searchCondition },
      });
      res.status(200).json(searchResults);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

export default handler;
