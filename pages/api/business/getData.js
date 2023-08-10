import { prisma } from "../../../db/prismaDB";

const handler = async (req, res) => {
  const email = req.body;

  try {
    const business = await prisma.business.findUnique({
      where: {
        email: email,
      },
      include: {
        book_sale: true,
      },
    });

    res.status(200).json(business);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default handler;
