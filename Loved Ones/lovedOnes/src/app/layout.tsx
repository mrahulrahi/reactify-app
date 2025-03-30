import type { Metadata } from 'next'
import 'bootstrap/dist/css/bootstrap.css'
import 'aos/dist/aos.css';
import ImportBsJS from "./ImportBsJS"
import ImportAOS from './importAOS';
import { Poppins } from 'next/font/google'
import './globals.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'


const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'lovedOnes',
  description: 'lovedOnes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} d-flex flex-column`}>
        <Header />
        <main>{children}</main>
        <Footer />
        <ImportBsJS />
        <ImportAOS />
      </body>
    </html>
  )
}