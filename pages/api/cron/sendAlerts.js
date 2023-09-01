import { prisma } from "../../../db/prismaDB";
import { sendNewMatchEmail } from "../../../services/emailService";
import { verifySignature } from "@upstash/qstash/nextjs";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  try {
    const unmatchedRecords = await prisma.match.findMany({
      where: {
        userNotified: false,
      },
      include: {
        consumer: {
          select: {
            email: true,
            email_alerts_on: true,
            username: true,
          },
        },
        listing: {
          select: {
            title: true,
          },
        },
      },
    });

    const emailAlertUsers = unmatchedRecords.filter(
      (record) => record.consumer.email_alerts_on
    );

    const groupedMatches = emailAlertUsers.reduce((acc, match) => {
      if (!acc[match.consumerId]) acc[match.consumerId] = [];
      acc[match.consumerId].push(match);
      return acc;
    }, {});

    for (const consumerId in groupedMatches) {
      const matchesForConsumer = groupedMatches[consumerId];
      const emailTo = matchesForConsumer[0].consumer.email;
      const username = matchesForConsumer[0].consumer.username;
      const firstMatchTitle = matchesForConsumer[0].listing.title;
      const remainingMatches = matchesForConsumer.length - 1;

      let emailContent;

      if (remainingMatches > 0) {
        emailContent = {
          recipient: emailTo,
          values: {
            logo: "https://www.bibliopal.com/logo.png",
            title: "You have new matches!",
            user: username,
            content: `You have a new match: ${firstMatchTitle} and ${remainingMatches} other matches`,
            cta1: "https://www.bibliopal.com/consumer/matches",
          },
        };
      } else {
        emailContent = {
          recipient: emailTo,
          values: {
            logo: "https://www.bibliopal.com/logo.png",
            title: "You have a new match!",
            user: username,
            content: `You have a new match: ${firstMatchTitle}. Click the link below to view all your matches`,
            cta1: "https://www.bibliopal.com/consumer/matches",
          },
        };
      }

      await sendNewMatchEmail(emailContent);

      await prisma.match.updateMany({
        where: {
          id: {
            in: matchesForConsumer.map((match) => match.id),
          },
        },
        data: {
          userNotified: true,
        },
      });
    }

    res
      .status(200)
      .json({ message: "Processed matches and sent notifications." });
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
};

export default verifySignature(handler);
