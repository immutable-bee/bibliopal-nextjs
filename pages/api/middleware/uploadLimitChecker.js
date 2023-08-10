import { prisma } from "../../../db/prismaDB";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

const uploadLimitChecker = (handler) => async (req, res, next) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const business = await prisma.business.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      id: true,
      membership: true,
      current_cycle_uploads: true,
      upload_credits: true,
    },
  });

  if (!business) {
    return res.status(401).json({ error: "Business not found" });
  }

  const membershipLimits = {
    FREE: 250,
    BASIC: 1000,
    PREMIUM: 5000,
  };

  const remainingMembershipCredits =
    membershipLimits[business.membership] - business.current_cycle_uploads;
  const numberOfNewUploads = Array.isArray(req.body) ? req.body.length : 0;

  const currentLimit = remainingMembershipCredits + business.upload_credits;

  if (numberOfNewUploads > currentLimit) {
    return res.status(403).json({ error: "Upload limit exceeded" });
  }

  const uploadExceedMembershipCredits =
    numberOfNewUploads >= remainingMembershipCredits;

  const memberCreditsCost = uploadExceedMembershipCredits
    ? remainingMembershipCredits
    : numberOfNewUploads;
  const paidCreditsCost = uploadExceedMembershipCredits
    ? numberOfNewUploads - remainingMembershipCredits
    : 0;

  req.businessData = { id: business.id, memberCreditsCost, paidCreditsCost };
  handler(req, res);
};

export default uploadLimitChecker;
