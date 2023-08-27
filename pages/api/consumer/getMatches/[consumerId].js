import { prisma } from "../../../../db/prismaDB";

const handler = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { consumerId } = req.query;

  try {
    const matches = await prisma.match.findMany({
      where: { consumerId: consumerId },
      include: {
        listing: {
          include: { owner: true },
        },
      },
    });

    let results = [];

    matches.forEach((match) => {
      let groupKey; // the key which will be either title or author
      let groupingObj;

      if (match.reason === "TITLE") {
        groupKey = match.listing.title;
      } else if (match.reason === "AUTHOR") {
        groupKey = match.listing.author;
      }

      // Check if this group already exists in the results
      const existingGroup = results.find(
        (item) => item[groupKey] && item.reason === match.reason
      );

      if (existingGroup) {
        existingGroup[groupKey].push(match.listing);
      } else {
        // If the group doesn't exist, create a new one
        groupingObj = {
          [groupKey]: [match.listing],
          reason: match.reason,
        };
        results.push(groupingObj);
      }
    });

    console.log(results);

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default handler;
