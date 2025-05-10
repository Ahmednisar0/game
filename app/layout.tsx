import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { GameStoreProvider } from "./contexts/GameStoreContext"; // Import the provider

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

export const metadata: Metadata = {
  title: "game",
  description: "game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}>
        <GameStoreProvider> {/* Wrap your entire app with the provider */}
          <Navbar />
          {children}
          <Footer />
        </GameStoreProvider>
      </body>
    </html>
  );
}
