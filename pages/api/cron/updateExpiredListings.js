//TODO:
// Check listing's date_listed & days_to_expiry
// if date_listed + days_expiry < Now, delete record.

import { prisma } from "../../../db/prismaDB";
import * as notify from "../notifier/notify";

const handler = async (req, res) => {
  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const listingsToDelete = [];

  try {
    const listings = await prisma.listing.findMany({});

    for (let listing of listings) {
      let expiryDate = new Date(listing.date_listed);
      expiryDate.setDate(expiryDate.getDate() + listing.days_to_expiry + 1);

      if (expiryDate <= currentDate) {
        listingsToDelete.push(listing.id);
      }
    }

    await prisma.listing.deleteMany({
      where: {
        id: {
          in: listingsToDelete,
        },
      },
    });

    res.status(200).json({ message: "Successfully deleted expired listings" });
  } catch (error) {
    notify.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export default handler;
