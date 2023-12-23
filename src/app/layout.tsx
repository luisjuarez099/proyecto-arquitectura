import type { Metadata } from "next";
import "./globals.css";
import Providers from "./Providers";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "ETCARS",
  description: "Pagina para consulta de amortiguadores KYB de Mexico",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
