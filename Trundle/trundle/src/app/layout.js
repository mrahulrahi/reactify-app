/* eslint-disable @next/next/next-script-for-ga */
/* eslint-disable @next/next/no-sync-scripts */
import { Inter, Figtree, Quicksand } from "next/font/google";
import "bootstrap/dist/css/bootstrap.css";
import "./globals.css";
import Providers from "./context/Provider";
import "react-datepicker/dist/react-datepicker.css";
import LayoutContent from "./LayoutContent";
import { OG_IMAGE, SITE_NAME, _metadata } from "./lib/metadata";

import "react-phone-number-input/style.css"; // Style for phone input
// import "react-select/dist/react-select.css"; // Style for react-select

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
      siteName: SITE_NAME,
      url: 'https://trundle.me',
      openGraph: {
         images: [
            { url: OG_IMAGE, width: 1200, height: 630 },
            ...previousImages,
         ],
      },
      twitter: {
         card: 'summary_large_image',
         title: _metadata?.homepage?.title,
         description: _metadata?.homepage?.description,
         image: { url: OG_IMAGE, width: 1200, height: 630 },
      },
   };
}

export default function RootLayout({ children }) {
   return (
      <html lang="en" className={`${figtree.variable} ${inter.variable} ${quicksand.variable}`}>
         <head>
            {/* Google Tag Manager */}
            <script dangerouslySetInnerHTML={{
               __html: `
                  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer','GTM-MS8S4JJS');
               `
            }} />
            {/* End Google Tag Manager */}

            <script async src="https://www.googletagmanager.com/gtag/js?id=G-R45C9YNZSM"></script>
            <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
            <script dangerouslySetInnerHTML={{
               __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'G-R45C9YNZSM');
               `,
            }} />
         </head>
         <body>
            {/* Google Tag Manager (noscript) */}
            <noscript>
               <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MS8S4JJS"
                  height="0" width="0" style={{ display: "none", visibility: "hidden" }}></iframe>
            </noscript>
            {/* End Google Tag Manager (noscript) */}

            <Providers>
               <LayoutContent>
                  <main>{children}</main>
               </LayoutContent>
            </Providers>
         </body>
      </html>
   );
}
