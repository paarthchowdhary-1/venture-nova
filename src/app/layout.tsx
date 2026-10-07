import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { AppShell } from "~/components/app-shell";
import { Footer } from "~/components/footer";
import { Navbar } from "~/components/navbar";
import { getIsAdmin, getMyVentures, getSessionUser } from "~/lib/session";
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSessionUser();
  const [isAdmin, ventures] = user
    ? await Promise.all([getIsAdmin(), getMyVentures()])
    : [false, []];

  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen`}>
        <AppShell
          user={user ? { name: user.name, email: user.email, isAdmin } : null}
          ventures={ventures}
          topNav={<Navbar />}
          footer={<Footer />}
        >
          {children}
        </AppShell>
      </body>
    </html>
  );
}
