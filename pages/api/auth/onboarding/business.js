import { prisma } from "../../../../db/prismaDB";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";

const handler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);
  const { data } = req.body;

  try {
    const user = await prisma.business.create({
      data: {
        ...data,
        email: session.user.email,
        user: {
          connect: {
            email: session.user.email,
          },
        },
      },
    });
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default handler;
