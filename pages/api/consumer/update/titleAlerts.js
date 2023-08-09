import { prisma } from "../../../../db/prismaDB";

const handler = async (req, res) => {
  const { email, title, type } = req.body;

  const titleToRemove = title;

  switch (type) {
    case "add":
      try {
        await prisma.consumer.update({
          where: { email: email },
          data: {
            tracked_titles: {
              push: title,
            },
          },
        });
        res.status(200).json({ message: "Title added successfully" });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
      break;
    case "delete":
      try {
        const consumer = await prisma.consumer.findUnique({
          where: { email: email },
          select: {
            tracked_titles: true,
          },
        });

        const updatedTitles = consumer.tracked_titles.filter(
          (title) => title !== titleToRemove
        );

        const updateConsumer = await prisma.consumer.update({
          where: { email: email },
          data: {
            tracked_titles: updatedTitles,
          },
        });
        res.status(200).json({ updateConsumer });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
      break;
    default:
      res.status(400).json({ message: "Invalid type or no type provided" });
  }
};

export default handler;
