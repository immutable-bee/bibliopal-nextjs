import { prisma } from "../../db/prismaDB";
import * as notify from "./notifier/notify";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { searchTerm, filter, searchZipCode, searchStore } = req.body;

    // Start with just the searchTerm condition
    const searchCondition = {
      [filter]: {
        contains: searchTerm,
        mode: "insensitive",
      },
    };

    // Using an array to hold owner conditions
    const ownerConditions = [];

    if (searchZipCode && searchZipCode.trim() !== "") {
      ownerConditions.push({ business_zip: searchZipCode });
    }

    if (searchStore && searchStore.trim() !== "") {
      ownerConditions.push({
        business_name: { contains: searchStore, mode: "insensitive" },
      });
    }

    if (ownerConditions.length) {
      searchCondition.owner = {
        AND: ownerConditions,
      };
    }

    try {
      const searchResults = await prisma.listing.findMany({
        where: searchCondition,
        include: { owner: true, booksale: true },
        orderBy: {
          date_listed: "desc",
        },
      });
      res.status(200).json(searchResults);
    } catch (error) {
      notify.error(error);
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

export default handler;
