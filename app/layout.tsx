import type { Metadata } from "next";
import { Geist, Geist_Mono, Jersey_15, Outfit } from "next/font/google";
import "./globals.css";


const jersey = Jersey_15({
  variable: "--font-jersey",
  subsets: ["latin"],
  weight: "400"
})

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: "400"
})


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "hints",
  description: "created by giovanni",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jersey.variable} ${outfit.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
