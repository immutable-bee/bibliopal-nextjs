import { prisma } from "../../db/prismaDB";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const tableData = req.body;

    const dataWithOwnerId = tableData.map((row) => ({
      ...row,
      ownerId: "Demo Store",
    }));

    try {
      const newListings = await prisma.listing.createMany({
        data: dataWithOwnerId,
      });
      res.status(200).json({ message: "Listings created successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

export default handler;
