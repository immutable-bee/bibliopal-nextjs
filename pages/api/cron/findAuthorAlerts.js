import { prisma } from "../../../db/prismaDB";
import { verifySignature } from "@upstash/qstash/nextjs";
import * as notify from "../notifier/notify";

export const config = {
  api: {
    bodyParser: false,
  },
};

const standardizeAuthor = (author) => {
  return author.replace(/[.,/#!$%\^&\*;:{}=\-_`~()]/g, "").toLowerCase();
};

const standardizeAuthorVariations = (author) => {
  const sanitized = standardizeAuthor(author);
  const parts = sanitized.split(" ");
  return [parts.join(" "), parts.reverse().join(" ")];
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
        author: true,
        owner: {
          select: {
            business_zip: true,
          },
        },
      },
    });

    const matchesByAuthor = allListings.reduce((acc, listing) => {
      const standardizedListingAuthor = standardizeAuthor(listing.author);

      const matchedAlert = activeAlerts.find((alert) => {
        const authorVariations = standardizeAuthorVariations(alert.author);
        return authorVariations.some((variant) =>
          standardizedListingAuthor.includes(variant)
        );
      });

      if (matchedAlert) {
        const dataToPush = {
          consumerId: matchedAlert.consumer.id,
          listingId: listing.id,
          reason: "AUTHOR",
        };

        if (
          !matchedAlert.consumer.tracked_zips ||
          matchedAlert.consumer.tracked_zips.length === 0 ||
          matchedAlert.consumer.tracked_zips.includes(
            listing.owner.business_zip
          )
        ) {
          acc.push(dataToPush);
        }
      }

      return acc;
    }, []);

    const existingMatchesSet = new Set(
      (
        await prisma.match.findMany({
          select: {
            consumerId: true,
            listingId: true,
          },
        })
      ).map((em) => `${em.consumerId}-${em.listingId}`)
    );

    const uniqueMatches = matchesByAuthor.filter((match) => {
      return !existingMatchesSet.has(`${match.consumerId}-${match.listingId}`);
    });

    await prisma.match.createMany({
      data: uniqueMatches,
    });

    res.status(200).json({ message: "Author matches updated successfully" });
  } catch (error) {
    notify.error(error);
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

export default verifySignature(handler);
