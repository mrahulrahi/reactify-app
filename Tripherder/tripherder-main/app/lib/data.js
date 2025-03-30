export const excludeHeaderPathNamesList = [
  "/auth/signin",
  "/auth/signup",
  "/auth/forgot-password",
  "/auth/update-password",
  "/auth/otp-verification",
];

export const authedPages = [
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
  "/update-password"
];