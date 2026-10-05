import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Footer } from "~/components/footer";
import { Navbar } from "~/components/navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const SITE = "https://venturenova.org";
const DESCRIPTION =
  "VentureNova helps young entrepreneurs ages 12 to 18 turn an idea into a real venture, with a personalized roadmap, lessons, real-world tasks, an AI coach, and evidence you can show.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "VentureNova | Turn your idea into a real venture",
    template: "%s | VentureNova",
  },
  description: DESCRIPTION,
  applicationName: "VentureNova",
  openGraph: {
    type: "website",
    siteName: "VentureNova",
    url: SITE,
    title: "VentureNova | Turn your idea into a real venture",
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "VentureNova | Turn your idea into a real venture",
    description: DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#1e3a8a",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex min-h-screen flex-col`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-sm focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
