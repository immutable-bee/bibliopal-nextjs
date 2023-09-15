import { prisma } from "../../../../db/prismaDB";
import * as notify from "../../notifier/notify";

const handler = async (req, res) => {
  const { email, field, value } = req.body;

  try {
    await prisma.consumer.update({
      where: { email: email },
      data: {
        [field]: value,
      },
    });
    res.status(200).json({ message: "Email Preferences Updated" });
  } catch (error) {
    notify.error(error);
    res.status(500).json({ message: error.message });
  }
};

export default handler;
