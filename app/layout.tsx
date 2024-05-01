import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/utils/providers";
import AuthContext from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChatUp",
  description: "ChatUp is a chat application for Next.js developers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body className={inter.className}>
          <AuthContext>{children}</AuthContext>
        </body>
      </Providers>
    </html>
  );
}
