import { prisma } from "../../../db/prismaDB";
import { verifySignature } from "@upstash/qstash/nextjs";

export const config = {
  api: {
    bodyParser: false,
  },
};

const standardizeString = (input) => {
  return input.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").toLowerCase();
};

const handler = async (req, res) => {
  try {
    const alerts = await prisma.alert.findMany({
      where: {
        title: {
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

    const conditions = activeAlerts.map((alert) => ({
      AND: [
        {
          title: {
            contains: standardizeString(alert.title),
          },
        },
        {
          author: {
            contains: standardizeString(alert.author),
          },
        },
      ],
    }));

    const matchingListings = await prisma.listing.findMany({
      where: {
        OR: conditions,
      },
      include: {
        owner: {
          select: {
            business_zip: true,
          },
        },
      },
    });

    const compositeMatches = [];

    matchingListings.forEach((listing) => {
      const matchedAlert = activeAlerts.find(
        (alert) =>
          standardizeString(listing.title).includes(
            standardizeString(alert.title)
          ) &&
          standardizeString(listing.author).includes(
            standardizeString(alert.author)
          )
      );

      if (matchedAlert) {
        const dataToPush = {
          consumerId: matchedAlert.consumer.id,
          listingId: listing.id,
          reason: "COMPOSITE",
        };

        const consumerHasNoTrackedZips =
          !matchedAlert.consumer.tracked_zips ||
          matchedAlert.consumer.tracked_zips.length === 0;

        const zipCodeMatch = matchedAlert.consumer.tracked_zips.includes(
          listing.owner.business_zip
        );

        if (consumerHasNoTrackedZips || zipCodeMatch) {
          compositeMatches.push(dataToPush);
        }
      }
    });

    const existingMatches = await prisma.match.findMany({
      select: {
        consumerId: true,
        listingId: true,
      },
    });

    const uniqueMatches = compositeMatches.filter((match) => {
      return !existingMatches.some(
        (existingMatch) =>
          existingMatch.consumerId === match.consumerId &&
          existingMatch.listingId === match.listingId
      );
    });

    await prisma.match.createMany({
      data: uniqueMatches,
    });

    res.status(200).json({ message: "Composite matches updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default verifySignature(handler);
