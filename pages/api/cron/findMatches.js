import { prisma } from "../../../db/prismaDB";
import similarity from "string-similarity";
import { verifySignature } from "@upstash/qstash/nextjs";

const standardizeString = (str) => {
  return str
    .toLowerCase()
    .replace(/[\W_]+/g, " ")
    .trim();
};

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  try {
    const consumers = await prisma.consumer.findMany({
      where: {
        alerts_paused: false,
      },
    });

    const listings = await prisma.listing.findMany();

    const allMatches = await prisma.match.findMany();
    const matchLookup = allMatches.reduce((acc, match) => {
      if (!acc[match.consumerId]) acc[match.consumerId] = new Set();
      acc[match.consumerId].add(match.listingId);
      return acc;
    }, {});

    const newMatches = [];

    for (const consumer of consumers) {
      const relevantListings =
        consumer.tracked_zips.length > 0
          ? listings.filter((listing) =>
              consumer.tracked_zips.includes(listing.owner.business_zip)
            )
          : listings;

      for (const listing of relevantListings) {
        if (
          matchLookup[consumer.id] &&
          matchLookup[consumer.id].has(listing.id)
        )
          continue;

        let reason = null;
        if (consumer.tracked_titles.includes(listing.title)) {
          reason = "TITLE";
        } else if (consumer.tracked_authors.includes(listing.author)) {
          reason = "AUTHOR";
        }

        if (reason) {
          newMatches.push({
            consumerId: consumer.id,
            listingId: listing.id,
            reason: reason,
          });
        }
      }
    }

    await prisma.match.createMany({
      data: newMatches,
      skipDuplicates: true,
    });
    res.status(200).json({ message: "Matches updated successfully." });
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
};

export default verifySignature(handler);
