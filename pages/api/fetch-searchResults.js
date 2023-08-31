import { prisma } from "../../db/prismaDB";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { searchTerm, filter, searchZipCode } = req.body;

    // Start with just the searchTerm condition
    const searchCondition = {
      [filter]: {
        contains: searchTerm,
        mode: "insensitive",
      },
    };

    // If searchZipCode is provided, add it to the search condition
    if (searchZipCode && searchZipCode.trim() !== "") {
      searchCondition.owner = {
        business_zip: searchZipCode,
      };
    }

    try {
      const searchResults = await prisma.listing.findMany({
        where: { ...searchCondition },
        include: { owner: true, booksale: true },
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
