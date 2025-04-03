/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      domains: ["api.trundle.me"], // Ensure this domain is correct
      remotePatterns: [
         {
            protocol: "https",
            hostname: "api.trundle.me",
            pathname: "/media/**", // Adjust the path if needed
         },
      ],
      unoptimized: true, // Disable Next.js image optimization
   },
};

module.exports = nextConfig;
