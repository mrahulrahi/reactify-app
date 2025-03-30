import { withAuth } from "next-auth/middleware";

export default withAuth(
   //  function middleware(req) {
   //     console.log(req.nextauth.token);
   //  },
   {
      callbacks: {
         authorized: ({ token }) => token?.user_role === 1,
      },
   }
);

export const config = { matcher: ["/influencer/:path*"] };
