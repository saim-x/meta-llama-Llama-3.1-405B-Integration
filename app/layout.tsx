import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

import HomePage from './pages/index';
import Home from "./chatBot/page";

export default function RootLayout() {
  return (
    <html lang="en">
      <body className={inter.className}>
        <HomePage />
      </body>
    </html>
  );
}
