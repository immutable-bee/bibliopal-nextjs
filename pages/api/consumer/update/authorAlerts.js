import { prisma } from "../../../../db/prismaDB";

const handler = async (req, res) => {
  const { email, author, type } = req.body;

  const authorToRemove = author;

  switch (type) {
    case "add":
      try {
        await prisma.consumer.update({
          where: { email: email },
          data: {
            tracked_authors: {
              push: author,
            },
          },
        });
        res.status(200).json({ message: "Author added successfully" });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
      break;
    case "delete":
      try {
        const consumer = await prisma.consumer.findUnique({
          where: { email: email },
          select: {
            tracked_authors: true,
          },
        });
        const updatedAuthors = consumer.tracked_authors.filter(
          (author) => author !== authorToRemove
        );

        const updateConsumer = await prisma.consumer.update({
          where: { email: email },
          data: {
            tracked_authors: updatedAuthors,
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
