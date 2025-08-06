import type { Metadata } from "next";
import { defaultFont } from "@/config";
import "./globals.css";



export const metadata: Metadata = {
  title: {
    template: `%s - Teslo | Shop`,
    default: "Home- Teslo | Shop",
  },
  description: "Tienda virtual de productos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${defaultFont.className}  antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
