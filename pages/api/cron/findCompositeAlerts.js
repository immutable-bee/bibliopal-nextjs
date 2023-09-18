import { prisma } from "../../../db/prismaDB";
import { verifySignature } from "@upstash/qstash/nextjs";
import * as notify from "../notifier/notify";

export const config = {
  api: {
    bodyParser: false,
  },
};

const standardizeString = (input) => {
  return input.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").toLowerCase();
};

const standardizeStringVariations = (str) => {
  const sanitized = standardizeString(str);
  const parts = sanitized.split(" ");
  return [parts.join(" "), parts.reverse().join(" ")];
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
            id: true,
          },
        },
      },
    });

    const activeAlerts = alerts.filter(
      (alert) => !alert.consumer.alerts_paused
    );

    const allListings = await prisma.listing.findMany({
      select: {
        id: true,
        title: true,
        author: true,
        owner: {
          select: {
            business_zip: true,
          },
        },
      },
    });

    const compositeMatches = [];

    allListings.forEach((listing) => {
      const standardizedListingTitle = standardizeString(listing.title);
      const standardizedListingAuthor = standardizeString(listing.author);

      const matchedAlert = activeAlerts.find((alert) => {
        const standardizedAlertTitleVariations = standardizeStringVariations(
          alert.title
        );
        const standardizedAlertAuthorVariations = standardizeStringVariations(
          alert.author
        );

        const titleMatch = standardizedAlertTitleVariations.some((variation) =>
          standardizedListingTitle.includes(variation)
        );

        const authorMatch = standardizedAlertAuthorVariations.some(
          (variation) => standardizedListingAuthor.includes(variation)
        );

        return titleMatch && authorMatch;
      });

      if (matchedAlert) {
        const dataToPush = {
          consumerId: matchedAlert.consumer.id,
          listingId: listing.id,
          reason: "TITLE",
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
    notify.error(error);
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

export default verifySignature(handler);
