import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Apex - Digital products that drive growth",
  description: "We design and develop fast, scalable websites and web applications that bring you customers and automate your work.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
