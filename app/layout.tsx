import type { Metadata } from "next";
import "./globals.css";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://apex.example.com";

export const metadata: Metadata = {
  title: "Apex - Digital products that drive growth",
  description: "We design and develop fast, scalable websites and web applications that bring you customers and automate your work.",
  metadataBase: new URL(baseUrl),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "Apex",
    title: "Apex - Digital products that drive growth",
    description: "We design and develop fast, scalable websites and web applications that bring you customers and automate your work.",
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Apex - Digital Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Apex - Digital products that drive growth",
    description: "We design and develop fast, scalable websites and web applications that bring you customers and automate your work.",
    images: [`${baseUrl}/og-image.png`],
    creator: "@apex",
  },
  alternates: {
    canonical: baseUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Apex",
    description: "Digital agency that designs and develops fast, scalable websites and web applications",
    url: baseUrl,
    sameAs: [
      "https://twitter.com/apex",
      "https://linkedin.com/company/apex",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Sales",
      telephone: "+1-XXX-XXX-XXXX",
      email: "hello@apex.com",
    },
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
