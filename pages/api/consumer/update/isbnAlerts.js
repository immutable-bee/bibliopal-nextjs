import { prisma } from "../../../../db/prismaDB";
import * as notify from "../../notifier/notify";

const handler = async (req, res) => {
  const { email, isbn, type } = req.body;

  if (!email || !isbn || !type) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  let consumer;
  try {
    consumer = await prisma.consumer.findUnique({
      where: { email: email },
      select: {
        id: true,
      },
    });
  } catch (error) {
    notify.error(error);
    return res.status(500).json({ message: "Error fetching consumer." });
  }

  if (!consumer) {
    return res.status(404).json({ message: "Consumer not found." });
  }

  switch (type) {
    case "add":
      try {
        await prisma.alert.create({
          data: {
            consumerId: consumer.id,
            isbn: isbn,
          },
        });

        res.status(200).json({ message: "ISBN added successfully" });
      } catch (error) {
        notify.error(error);
        res.status(500).json({ message: error.message });
      }
      break;

    case "delete":
      try {
        const deleteAlert = await prisma.alert.delete({
          where: {
            consumerId_isbn: {
              consumerId: consumer.id,
              isbn: isbn,
            },
          },
        });

        res.status(200).json({ deleteAlert });
      } catch (error) {
        notify.error(error);
        res.status(500).json({ message: error.message });
      }
      break;
  }
};

export default handler;
