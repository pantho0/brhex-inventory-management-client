import type { Metadata } from "next";
import React from "react";
import "./globals.css";
import { Providers } from "@/lib/Providers/Providers";

export const metadata: Metadata = {
  title: "BRHEX INVENTORY MANAGEMENT",
  description: "BRHEX INVENTORY MANAGEMENT",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
