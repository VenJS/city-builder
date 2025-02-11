import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "My city-builder app",
  description: "City builder app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>

        {children}
      </body>
    </html>
  );
}