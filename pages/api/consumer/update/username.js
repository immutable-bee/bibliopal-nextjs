import { prisma } from "../../../../db/prismaDB";
import * as notify from "../../notifier/notify";

const handler = async (req, res) => {
  const { email, username } = req.body;

  try {
    const consumerUpdate = await prisma.consumer.update({
      where: { email: email },
      data: { username: username },
    });

    res.status(200).json(consumerUpdate);
  } catch (error) {
    notify.error(error);
    res.status(500).json({ message: error.message });
  }
};

export default handler;
