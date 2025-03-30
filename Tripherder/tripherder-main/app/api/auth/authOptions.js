import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import SpotifyProvider from "next-auth/providers/spotify";
import axios from "axios";
import Config from "../../store/api";

export const authOptions = {
   secret: process.env.NEXTAUTH_SECRET,
   providers: [

      Credentials({
         name: "Credentials",
         async authorize(credentials) {
            const user = {
               access_token: credentials?.access_token,
               csrfToken: credentials?.csrfToken,
            };
            return user;
         },
      }),

      GoogleProvider({
         clientId: process.env.GOOGLE_AUTH_CLIENT_ID,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),

      FacebookProvider({
         clientId: process.env.FACEBOOK_CLIENT_ID,
         clientSecret: process.env.FACEBOOK_CLIENT_SECRET
      }),

      SpotifyProvider({
         clientId: process.env.SPOTIFY_CLIENT_ID,
         clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
         authorization: Config.SPOTIFY_SCOPE
      }),
   ],
   pages: {
      signIn: "/auth/signin",
   },
   callbacks: {
      async jwt({ token, user, account }) {
         if (account?.provider === "google") {
            try {
               const response = await axios.post(Config.GOOGLE_LOGIN,
                  { token: account?.id_token },
                  {
                     headers: {
                        'Content-Type': 'application/json',
                     },
                  });
               token.access_token = response.data?.access_token;
            } catch (error) {
               console.error("Error calling API:", error);
            }
         }
         if (account?.provider === "facebook") {
            try {
               const response = await axios.post(Config.FACEBOOK_LOGIN,
                  { access_token: account?.access_token, user_id: account?.providerAccountId },
                  {
                     headers: {
                        'Content-Type': 'application/json',
                     },
                  });
               token.access_token = response.data?.access_token;
            } catch (error) {
               console.error("Error calling API:", error);
            }
         }
         if (account?.provider === "spotify") {
            try {
               const response = await axios.post(Config.SPOTIFY_LOGIN,
                  { access_token: account?.access_token },
                  {
                     headers: {
                        'Content-Type': 'application/json',
                     },
                  });
               token.access_token = response.data?.access_token;
               token.spotify_token = account?.access_token;
            } catch (error) {
               console.error("Error calling API:", error);
            }
         }
         return { ...token, ...user };
      },
      async redirect({ url, baseUrl }) {
         return baseUrl + "/";
      },
      async session({ session, token, user }) {
         session.user = token;
         return session;
      },
   },
};
