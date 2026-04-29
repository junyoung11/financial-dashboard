import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "../lib/theme-context";

export const metadata: Metadata = {
  title: "금융 대시보드 만들기",
  description: "Next.js 기반 금융 분석 대시보드 데모",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}