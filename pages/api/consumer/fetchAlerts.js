import { prisma } from "../../../db/prismaDB";
import * as notify from "../notifier/notify";

const handler = async (req, res) => {
  const consumerId = req.body;

  if (!consumerId) {
    return res.status(400).json({ message: "Missing Consumer Id" });
  }

  try {
    const alerts = await prisma.alert.findMany({
      where: { consumerId: consumerId },
    });

    res.status(200).json(alerts);
  } catch (error) {
    notify.error(error);
    res.status(500).json({ message: error.message });
  }
};

export default handler;
