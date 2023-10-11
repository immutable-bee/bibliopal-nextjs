import { prisma } from "../../../db/prismaDB";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

const handler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  const { data, includeTotalCost } = req.body;

  let business;

  try {
    business = await prisma.business.findUnique({
      where: { email: session.user.email },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

  if (!business) {
    res.status(500).json({ message: "Business user not found" });
  }

  try {
    const updatePreferences = await prisma.business.update({
      where: { email: session.user.email },
      data: {
        pricePreferences: data,
        useTotalPrice: includeTotalCost,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  res.status(200).json("Preferences updated successfully");
};

export default handler;
