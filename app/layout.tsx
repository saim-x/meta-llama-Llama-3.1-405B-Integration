import "./globals.css";
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Your Website',
  description: 'Your website description',
}
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <header>{/* Your header component */}</header>
        <main>{children}</main>
        <footer>{/* Your footer component */}</footer>
      </body>
    </html>
  )
}