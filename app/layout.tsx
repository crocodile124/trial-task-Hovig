"use client";

import "./globals.css";
import { SessionProvider } from "next-auth/react";
import Layout from "@/components/Layout";
const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Layout>
            {children}
          </Layout>
        </SessionProvider>
      </body>
    </html>
  );
}
