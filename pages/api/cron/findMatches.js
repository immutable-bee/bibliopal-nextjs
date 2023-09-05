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
      include: {
        alerts: true,
      },
    });

    const consumersWithZips = consumers.filter(
      (consumer) => consumer.tracked_zips && consumer.tracked_zips.length
    );
    const consumersWithoutZips = consumers.filter(
      (consumer) => !consumer.tracked_zips || !consumer.tracked_zips.length
    );

    const allTrackedZips = [
      ...new Set(
        consumersWithZips.flatMap((consumer) => consumer.tracked_zips)
      ),
    ];

    const listingsWithZips = await prisma.listing.findMany({
      include: {
        owner: {
          select: {
            business_zip: true,
          },
        },
      },
      where: {
        owner: {
          business_zip: {
            in: allTrackedZips,
          },
        },
      },
    });

    const listingsWithoutZips = consumersWithoutZips.length
      ? await prisma.listing.findMany({
          include: {
            owner: {
              select: {
                business_zip: true,
              },
            },
          },
        })
      : [];

    const allMatches = await prisma.match.findMany();
    const matchLookup = allMatches.reduce((acc, match) => {
      if (!acc[match.consumerId]) acc[match.consumerId] = new Set();
      acc[match.consumerId].add(match.listingId);
      return acc;
    }, {});

    const newMatches = [];

    const processMatchingLogic = (consumer, listings) => {
      for (const listing of listings) {
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
    };

    for (const consumer of consumersWithZips) {
      const relevantListings = listingsWithZips.filter((listing) =>
        consumer.tracked_zips.includes(listing.owner.business_zip)
      );
      processMatchingLogic(consumer, relevantListings);
    }

    for (const consumer of consumersWithoutZips) {
      const relevantListings = listingsWithoutZips;
      processMatchingLogic(consumer, relevantListings);
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
