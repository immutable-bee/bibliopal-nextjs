import { prisma } from "../../../db/prismaDB";
import { verifySignature } from "@upstash/qstash/nextjs";

export const config = {
  api: {
    bodyParser: false,
  },
};

const standardizeAuthor = (author) => {
  return author.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").toLowerCase();
};

const handler = async (req, res) => {
  try {
    const alerts = await prisma.alert.findMany({
      where: {
        AND: [
          {
            title: {
              equals: null,
            },
          },
          {
            author: {
              not: null,
            },
          },
        ],
      },
      include: {
        consumer: {
          select: {
            alerts_paused: true,
            tracked_zips: true,
          },
        },
      },
    });

    const activeAlerts = alerts.filter(
      (alert) => !alert.consumer.alerts_paused
    );

    const standardizedAuthors = activeAlerts.map((alert) =>
      standardizeAuthor(alert.author)
    );

    const matchingListings = await prisma.listing.findMany({
      where: {
        OR: standardizedAuthors.map((author) => ({
          author: {
            contains: author,
          },
        })),
      },
      include: {
        owner: {
          select: {
            business_zip,
          },
        },
      },
    });

    const matchesByAuthor = [];

    matchingListings.forEach((listing) => {
      const matchedAlert = activeAlerts.find((alert) =>
        listing.author
          .toLowerCase()
          .includes(
            alert.author.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "").toLowerCase()
          )
      );

      if (matchedAlert) {
        const dataToPush = {
          consumerId: matchedAlert.consumer.id,
          listingId: listing.id,
          reason: "AUTHOR",
        };

        if (
          !matchedAlert.consumer.tracked_zips ||
          matchedAlert.consumer.tracked_zips.length === 0
        ) {
          matchesByAuthor.push(dataToPush);
        } else if (
          matchedAlert.consumer.tracked_zips.includes(
            listing.owner.business_zip
          )
        ) {
          matchesByAuthor.push(dataToPush);
        }
      }
    });

    const existingMatches = await prisma.match.findMany({
      select: {
        consumerId: true,
        listingId: true,
      },
    });

    const uniqueMatches = matchesByAuthor.filter((match) => {
      return !existingMatches.some(
        (existingMatch) =>
          existingMatch.consumerId === match.consumerId &&
          existingMatch.listingId === match.listingId
      );
    });

    await prisma.match.createMany({
      data: uniqueMatches,
    });

    res.status(200).json({ message: "Author matches updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default verifySignature(handler);
