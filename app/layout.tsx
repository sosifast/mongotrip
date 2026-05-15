import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mongotrip | Discover Your Next Destination",
  description: "Find your next destination with Mongotrip. From beautiful natural reserves, luxury hotels, to hidden gems like rustic workshops and factories.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} h-full antialiased font-sans`}
    >
      <body className="min-h-full flex flex-col bg-stone-50 text-stone-900 selection:bg-orange-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
