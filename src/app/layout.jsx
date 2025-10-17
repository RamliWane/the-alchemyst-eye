import { Geist, Geist_Mono, Nosifer } from "next/font/google";
import Navbar from "./LandingPage/components/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const nosifer = Nosifer({
  variable: "--font-horror",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "The Alchemyst Eye",
  description: "Transforming insights into action with a modern, fast Next.js app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${nosifer.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}