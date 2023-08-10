import { prisma } from "../../../../db/prismaDB";

const handler = async (req, res) => {
  const { email, zip, type } = req.body;

  const zipToRemove = zip;

  switch (type) {
    case "add":
      try {
        await prisma.consumer.update({
          where: { email: email },
          data: {
            tracked_zips: {
              push: zip,
            },
          },
        });
        res.status(200).json({ message: "Zip Code added successfully" });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
      break;
    case "delete":
      try {
        const consumer = await prisma.consumer.findUnique({
          where: { email: email },
          select: {
            tracked_zips: true,
          },
        });
        const updatedZips = consumer.tracked_zips.filter(
          (zip) => zip !== zipToRemove
        );

        const updateConsumer = await prisma.consumer.update({
          where: { email: email },
          data: {
            tracked_zips: updatedZips,
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
