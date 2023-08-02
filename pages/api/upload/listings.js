import { prisma } from "../../../db/prismaDB";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

const handler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  if (req.method === "POST") {
    const tableData = req.body;

    let ownerId;

    try {
      const business = await prisma.business.findUnique({
        where: { email: session.user.email },
      });
      ownerId = business.id;
    } catch (error) {
      res.status(500).json({
        Error: "An error occured while fetching the user: " + err.message,
      });
    }

    const dataWithOwnerId = tableData.map((row) => ({
      ...row,
      ownerId: ownerId,
    }));

    try {
      const newListings = await prisma.listing.createMany({
        data: dataWithOwnerId,
      });
      res.status(200).json({ message: "Listings created successfully" });
    } catch (error) {
      res.status(500).json({
        message: "An error occured while uploading listings: " + error.message,
      });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

export default handler;
