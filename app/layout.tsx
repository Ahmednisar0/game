import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { GameStoreProvider } from "./contexts/GameStoreContext"; // Import the provider

// Load local fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Favicon setup inside metadata
export const metadata: Metadata = {
  title: "gamifox",
  description: "gamifox",
  icons: {
    icon: "/favion.ico", // Make sure favicon.ico is in the /public folder
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}>
        <GameStoreProvider>
          <Navbar />
          {children}
          <Footer />
        </GameStoreProvider>
      </body>
    </html>
  );
}
