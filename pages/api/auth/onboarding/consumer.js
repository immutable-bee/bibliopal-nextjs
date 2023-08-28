import { prisma } from "../../../../db/prismaDB";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";

const handler = async (req, res) => {
  const username = req.body;

  const session = await getServerSession(req, res, authOptions);

  try {
    const business = await prisma.consumer.create({
      data: {
        username: username,
        email: session.user.email,
        user: {
          connect: {
            email: session.user.email,
          },
        },
      },
    });
    const user = await prisma.user.update({
      where: { email: email },
      data: {
        onboarding_complete: true,
      },
    });
    res.status(200).json({ business });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};

export default handler;
