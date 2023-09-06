import { prisma } from "../../../db/prismaDB";
import { verifySignature } from "@upstash/qstash/nextjs";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  console.log("Handler start");

  try {
    const alerts = await prisma.alert.findMany({
      where: {
        isbn: {
          not: null,
        },
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

    const isbnList = activeAlerts.map((alert) => alert.isbn);

    const matchingListings = await prisma.listing.findMany({
      where: {
        isbn: {
          in: isbnList,
        },
      },
      include: {
        owner: {
          select: {
            business_zip,
          },
        },
      },
    });

    const matches = [];

    matchingListings.forEach((listing) => {
      const matchedAlert = activeAlerts.find(
        (alert) => alert.isbn === listing.isbn
      );

      if (matchedAlert) {
        const consumerHasNoTrackedZips =
          !matchedAlert.consumer.tracked_zips ||
          matchedAlert.consumer.tracked_zips.length === 0;

        if (listing.owner) {
          const zipCodeMatch = matchedAlert.consumer.tracked_zips.includes(
            listing.owner.business_zip
          );

          if (consumerHasNoTrackedZips || zipCodeMatch) {
            const dataToPush = {
              consumerId: matchedAlert.consumer.id,
              listingId: listing.id,
              reason: "ISBN",
            };
            matches.push(dataToPush);
          }
        } else {
          console.log("Missing owner for listing with ID:", listing.id);
        }
      }
    });

    const existingMatches = await prisma.match.findMany({
      select: {
        consumerId: true,
        listingId: true,
      },
    });

    const uniqueMatches = matches.filter((match) => {
      return !existingMatches.some(
        (existingMatch) =>
          existingMatch.consumerId === match.consumerId &&
          existingMatch.listingId === match.listingId
      );
    });

    await prisma.match.createMany({
      data: uniqueMatches,
    });

    res.status(200).json({ message: "ISBN matches updated successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

export default verifySignature(handler);
