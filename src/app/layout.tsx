import type { Metadata } from "next";
import "./globals.css";
import Providers from "./Providers";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Ninja Shocks",
  description: "Pagina para consulta de amortiguadores KYB de Mexico",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Providers>
        <body>
          <Navbar />
          {children}
          <Footer />
        </body>
      </Providers>
    </html>
  );
}
