import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Footer } from "~/components/footer";
import { Navbar } from "~/components/navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VentureNova",
  description:
    "A personalized entrepreneurship operating system for young entrepreneurs.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex min-h-screen flex-col`}>
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
