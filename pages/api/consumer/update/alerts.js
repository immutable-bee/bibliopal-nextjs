import { prisma } from "../../../../db/prismaDB";
import * as notify from "../../notifier/notify";

const handler = async (req, res) => {
  const { email, title, author, type } = req.body;

  if (!email || !author || !type) {
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
            title: title || null,
            author: author,
          },
        });

        res.status(200).json({ message: "Alert added successfully" });
      } catch (error) {
        notify.error(error);
        res.status(500).json({ message: error.message });
      }
      break;

    case "delete":
      try {
        let deleteAlert;
        if (title) {
          deleteAlert = await prisma.alert.delete({
            where: {
              consumerId: consumer.id,
              title_author: {
                title: title,
                author: author,
              },
            },
          });
        } else {
          deleteAlert = await prisma.alert.delete({
            where: {
              consumerId_author: {
                consumerId: consumer.id,
                author: author,
              },
            },
          });
        }

        res.status(200).json({ deleteAlert });
      } catch (error) {
        notify.error(error);
        res.status(500).json({ message: error.message });
      }
      break;

    default:
      res.status(400).json({ message: "Invalid type or none provided" });
  }
};

export default handler;
