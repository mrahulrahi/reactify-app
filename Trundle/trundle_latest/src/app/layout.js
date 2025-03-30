/* eslint-disable @next/next/next-script-for-ga */
/* eslint-disable @next/next/no-sync-scripts */
import { Inter, Figtree, Quicksand } from "next/font/google";
import "bootstrap/dist/css/bootstrap.css";
import "./globals.css";
import Providers from "./context/Provider";
import "react-datepicker/dist/react-datepicker.css";
import LayoutContent from "./LayoutContent"
import { OG_IMAGE, SITE_NAME, _metadata } from "./lib/metadata";

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


export async function generateMetadata(parent) {

   const previousImages = (await parent).openGraph?.images || [];

   return {
      title: _metadata?.homepage?.title,
      description: _metadata?.homepage?.description,
      siteName: SITE_NAME, // Add your site name here
      url: 'https://trundle.me', // Add your website URL here
      openGraph: {
         images: [
            {
               url: OG_IMAGE,
               width: 1200,  // common recommended width
               height: 630   // common recommended height
            },
            ...previousImages
         ],
      },
      twitter: {
         card: 'summary_large_image', // Twitter card type
         title: _metadata?.homepage?.title,
         description: _metadata?.homepage?.description,
         image: {
            url: OG_IMAGE,
            width: 1200,  // common recommended width
            height: 630   // common recommended height
         },
      }
   }
}

export default function RootLayout({ children }) {
   return (
      <html lang="en" className={`${figtree.variable} ${inter.variable} ${quicksand.variable}`}>
         <head>
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-R45C9YNZSM"></script>
            <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
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
