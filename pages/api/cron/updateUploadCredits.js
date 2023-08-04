import { prisma } from "../../../db/prismaDB";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const businessesToUpdate = await prisma.business.findMany({
    where: {
      upload_cycle_start_date: {
        lte: new Date(new Date() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
      },
    },
  });

  const updatePromises = businessesToUpdate.map((business) =>
    prisma.business.update({
      where: { id: business.id },
      data: {
        current_cycle_uploads: 0,
        upload_cycle_start_date: new Date(),
      },
    })
  );

  await Promise.all(updatePromises);

  res.status(200).json({ message: "Successfully updated businesses" });
};

export default handler;
