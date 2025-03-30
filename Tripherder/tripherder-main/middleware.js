import { withAuth } from "next-auth/middleware";

const authMiddleware = withAuth({
   callbacks: {
      async authorized(req) {
         return !!req.token?.access_token;
      },
   },
});

export default authMiddleware;

export const config = {
   // Define the routes this middleware should protect
   matcher: [
      "/my-profile",
      "/itineraries",
      "/favorite-itineraries",
      "/invoices",
      "/favorite-itineraries/:path*",
      "/saved-itineraries",
      "/saved-itineraries/:path*",
      "/transaction-history",
      "/update-favorite-activity",
      "/update-favorite-artists",
      "/update-password",
      "/select-favorite-artist",
      "/select-favorite-activities"
   ],
};
