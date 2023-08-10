import { prisma } from "../../../db/prismaDB";

const handler = async (req, res) => {
  const { email, data } = req.body;

  console.log(email, data);

  try {
    const business = await prisma.business.update({
      where: { email: email },
      data: {
        ...data,
      },
    });
    res.status(200).json({ business });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default handler;
