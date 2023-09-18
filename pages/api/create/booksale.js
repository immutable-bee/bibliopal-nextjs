import { prisma } from "../../../db/prismaDB";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import * as notify from "../notifier/notify";

const handler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);
  const data = req.body;

  try {
    const user = await prisma.business.findUnique({
      where: { email: session.user.email },
      include: {
        library: {
          select: {
            id: true,
          },
        },
      },
    });

    const newSale = await prisma.booksale.create({
      data: {
        ...data,
        ownerId: user.library.id,
      },
    });
    res.status(200).json({ message: "Listings created successfully" });
  } catch (error) {
    notify.error(error);
    res.status(500).json({ message: "An error occured: " + error.message });
  }
};

export default handler;
