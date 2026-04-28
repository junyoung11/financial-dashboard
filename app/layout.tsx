import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "../lib/theme-context";

export const metadata: Metadata = {
  title: "FinDash – Financial Analytics Dashboard",
  description: "Professional financial analytics dashboard built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}