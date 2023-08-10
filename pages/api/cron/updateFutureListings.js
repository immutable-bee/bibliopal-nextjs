//TODO:
//Check future listing record's booksale start date
// If record's start date < Now, add record to listing model & delete record

import { prisma } from "../../../db/prismaDB";

const handler = async (req, res) => {
  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  try {
    // Get all past and present BookSales
    const bookSales = await prisma.bookSale.findMany({
      where: {
        date_starts: {
          lte: currentDate,
        },
      },
      include: {
        books: true,
      },
    });

    const createListingsPromises = [];
    const futureListingsToDelete = [];
    for (let bookSale of bookSales) {
      let daysToExpiry = Math.floor(
        (bookSale.date_ends - currentDate) / (1000 * 60 * 60 * 24)
      );

      for (let futureListing of bookSale.books) {
        createListingsPromises.push(
          prisma.listing.create({
            data: {
              ownerId: bookSale.ownerId,
              date_listed: currentDate,
              days_to_expiry: daysToExpiry,
              title: futureListing.title,
              isbn: futureListing.isbn,
              author: futureListing.author,
              format: futureListing.format,
              image_url: futureListing.image_url,
            },
          })
        );
        futureListingsToDelete.push(futureListing.id);
      }
    }

    // Batch create Listings
    await Promise.all(createListingsPromises);

    // If Listing creation successful, delete FutureListings
    for (let id of futureListingsToDelete) {
      await prisma.futureListing.delete({ where: { id } });
    }

    res
      .status(200)
      .json({ message: "Successfully converted FutureListings to Listings" });
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
};

export default handler;
