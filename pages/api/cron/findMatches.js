import { prisma } from "../../../db/prismaDB";
import similarity from "string-similarity";
import { verifySignature } from "@upstash/qstash";

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

    for (const consumer of consumers) {
      try {
        // 2. Filter out the listings based on their tracked zips.
        let listings = await prisma.listing.findMany({
          where: {
            owner: {
              business_zip: {
                in: consumer.tracked_zips,
              },
            },
          },
        });

        const existingMatches = await prisma.match.findMany({
          where: {
            consumerId: consumer.id,
          },
        });
        const existingListingIds = existingMatches.map(
          (match) => match.listingId
        );

        const newMatches = [];

        for (const listing of listings) {
          if (existingListingIds.includes(listing.id)) continue;

          const standardizedAuthor = standardizeString(listing.author);
          const standardizedTitle = standardizeString(listing.title);

          const bestAuthorMatch = similarity.findBestMatch(
            standardizedAuthor,
            consumer.tracked_authors.map(standardizeString)
          );
          const bestTitleMatch = similarity.findBestMatch(
            standardizedTitle,
            consumer.tracked_titles.map(standardizeString)
          );

          if (
            bestAuthorMatch.bestMatch.rating > 0.8 ||
            bestTitleMatch.bestMatch.rating > 0.8
          ) {
            let reason;
            if (
              bestTitleMatch.bestMatch.rating > bestAuthorMatch.bestMatch.rating
            ) {
              reason = "TITLE";
            } else {
              reason = "AUTHOR";
            }

            newMatches.push({
              consumerId: consumer.id,
              listingId: listing.id,
              reason: reason,
            });
          }
        }

        // Batch insert new matches
        await prisma.match.createMany({
          data: newMatches,
          skipDuplicates: true,
        });
      } catch (error) {
        console.error(
          `Error processing consumer ${consumer.id}: ${error.message}`
        );
      }
    }

    res.status(200).json({ message: "Matches updated successfully." });
  } catch (error) {
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
};

export default verifySignature(handler);
