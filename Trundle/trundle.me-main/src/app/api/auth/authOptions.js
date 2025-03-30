import Credentials from "next-auth/providers/credentials";

export const authOptions = {
   secret: process.env.NEXTAUTH_SECRET,
   providers: [
      Credentials({
         name: "Credentials",
         async authorize(credentials) {
            const user = {
               access_token: credentials?.access_token,
               csrfToken: credentials?.csrfToken,
               is_active: credentials?.is_active === "true" ? true : false,
               refresh_token: credentials?.refresh_token,
               user_role: parseInt(credentials?.user_role),
               user_id:credentials?.user_id
            };
            return user;
         },
      }),
   ],
   pages: {
      signIn: "/auth/signin",
   },
   callbacks: {
      async jwt({ token, user }) {
         return { ...token, ...user };
      },
      async session({ session, token }) {
         session.user = token;
         return session;
      },
   },
};
