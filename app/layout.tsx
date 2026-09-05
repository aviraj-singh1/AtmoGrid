import type { Metadata } from "next";
import { AppShell } from "@/components/layout/app-shell";
import "maplibre-gl/dist/maplibre-gl.css";
import "./globals.css";
export const metadata: Metadata = {
  title: "AtmoGrid | Command Center",
  description:
    "National Weather Evidence & Ground Intelligence Platform — SIH 2026 prototype.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
