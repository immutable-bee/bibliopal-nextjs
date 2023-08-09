import { prisma } from "../../db/prismaDB";

const handler = async (req, res) => {
  const email = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      include: {
        consumer: true,
        business: true,
      },
    });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default handler;