import { prisma } from "../../../db/prismaDB";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import * as notify from "../notifier/notify";

const handler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);
  const data = req.body;

  try {
    const bookSale = await prisma.bookSale.create({
      data: {
        ...data,
        owner: {
          connect: {
            email: session.user.email,
          },
        },
      },
    });
    res.status(200).json({ message: bookSale });
  } catch (error) {
    notify.error(error);
    res.status(500).json({ message: error.message });
  }
};

export default handler;
