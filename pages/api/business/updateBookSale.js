import { prisma } from "../../../db/prismaDB";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";

const handler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  const { data } = req.body;

  try {
    const business = await prisma.business.findUnique({
      where: { email: session.user.email },
      include: {
        book_sale: true,
      },
    });
    const updateBookSale = await prisma.bookSale.update({
      where: { id: business.book_sale.id },
      data: {
        ...data,
      },
    });

    res.status(200).json({ message: "Booksale updated: " + updateBookSale });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default handler;
