import AuthContext from "@/context/AuthContex";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ToasterContext from "@/context/ToasterContext";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ModalProvider } from "@/components/providers/modal-provider";

import Providers from "@/components/providers/react-query-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KwinLaundry",
  description: "Aplikasi Kwitansi Laundry Kiloan",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
          <Providers>
            <AuthContext>
              <ModalProvider />
              <ToasterContext />
              {children}
            </AuthContext>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
