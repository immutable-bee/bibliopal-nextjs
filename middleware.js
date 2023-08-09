export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/consumer",
    "/business",
    "/consumer/profile",
    "/consumer/matches",
    "/business/profile",
    "/business/uploadlistings",
    "/business/uploadlistings/future",
    "/auth/onboarding",
  ],
};
