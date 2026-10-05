import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { requireAdmin } from "~/lib/admin";

export const metadata: Metadata = {
  title: "Admin | VentureNova",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  await requireAdmin();
  return (
    <div>
      <div className="border-b border-border bg-tint">
        <div className="mx-auto flex max-w-5xl items-center gap-5 px-4 py-2 text-sm">
          <span className="font-semibold">Admin</span>
          <Link
            href="/admin"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Overview
          </Link>
          <Link
            href="/admin/log"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Access log
          </Link>
        </div>
      </div>
      {children}
    </div>
  );
}
