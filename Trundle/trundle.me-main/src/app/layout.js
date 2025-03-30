/* eslint-disable @next/next/next-script-for-ga */
/* eslint-disable @next/next/no-sync-scripts */
import { Inter, Figtree, Quicksand } from "next/font/google";
import "bootstrap/dist/css/bootstrap.css";
import "./globals.css";
import Providers from "./context/Provider";
import "react-datepicker/dist/react-datepicker.css";
import LayoutContent from "./LayoutContent"
import { _metadata } from "./lib/metadata";

const figtree = Figtree({
   subsets: ["latin"],
   style: ["normal", "italic"],
   weight: ["300", "400", "500", "600", "700", "800", "900"],
   display: "swap",
   variable: "--font-primary",
   preload: false,
});

const inter = Inter({
   subsets: ["latin"],
   style: ["normal"],
   weight: ["300", "400", "500", "600", "700", "800", "900"],
   display: "swap",
   variable: "--font-secondary",
   preload: false,
});

const quicksand = Quicksand({
   subsets: ["latin"],
   style: ["normal"],
   weight: ["700"],
   display: "swap",
   variable: "--font-tertiary",
   preload: false,
});

export const metadata = {
   metadataBase: new URL('https://api.trundle.me'),
   title: _metadata?.homepage?.title,
   description: _metadata?.homepage?.description,
   openGraph: {
      title: _metadata?.homepage?.title,
      description: _metadata?.homepage?.description,
      url: 'https://api.trundle.me',
      siteName: 'https://trundle.me',
      images: [
         {
            url: '/media/itinerary_images/file_rXQ4f7G.jpeg', // Must be an absolute URL
            width: 800,
            height: 600,
         },
      ],
      locale: 'en_US',
      type: 'website',
   },
}


export default function RootLayout({ children }) {
   return (
      <html lang="en" className={`${figtree.variable} ${inter.variable} ${quicksand.variable}`}>
         <head>
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-R45C9YNZSM"></script>
            <script
               dangerouslySetInnerHTML={{
                  __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-R45C9YNZSM');
            `,
               }}
            />
         </head>
         <body>
            <Providers>
               <LayoutContent>
                  <main>{children}</main>
               </LayoutContent>
            </Providers>
         </body>
      </html>
   );
}
