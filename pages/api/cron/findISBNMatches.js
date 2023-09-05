import { prisma } from "../../../db/prismaDB";
import { verifySignature } from "@upstash/qstash/nextjs";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
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

    const isbnList = alertIsbns.map((alert) => alert.isbn);

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

    const listingsNoTrackedZips = [];
    const listingsMatchingZips = [];

    matchingListings.forEach((listing) => {
      const matchedAlert = alerts.find((alert) => alert.isbn === listing.isbn);

      if (matchedAlert) {
        const dataToPush = {
          consumerId: matchedAlert.consumer.id,
          listingId: listing.id,
        };

        if (
          !matchedAlert.consumer.tracked_zips ||
          matchedAlert.consumer.tracked_zips.length === 0
        ) {
          listingsNoTrackedZips.push(dataToPush);
        } else if (
          matchedAlert.consumer.tracked_zips.includes(
            listing.owner.business_zip
          )
        ) {
          listingsMatchingZips.push(dataToPush);
        }
      }
    });

    res.status(200).json({ message: "ISBN matches updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default verifySignature(handler);
