import type { Metadata } from "next";
import "./globals.css";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://flowforge.systems";

export const metadata: Metadata = {
  title: "Flowforge Systems - Websites & AI systems that drive growth",
  description: "We design and build modern websites and AI automations that turn traffic into clients and help businesses scale faster.",
  metadataBase: new URL(baseUrl),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "Flowforge Systems",
    title: "Flowforge Systems - Websites & AI systems that drive growth",
    description: "We design and build modern websites and AI automations that turn traffic into clients and help businesses scale faster.",
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Flowforge Systems - Web & AI Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flowforge Systems - Websites & AI systems that drive growth",
    description: "We design and build modern websites and AI automations that turn traffic into clients and help businesses scale faster.",
    images: [`${baseUrl}/og-image.png`],
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
    name: "Flowforge Systems",
    description: "Web & AI agency that designs and builds modern websites and automations that drive growth",
    url: baseUrl,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Sales",
      telephone: "+1-XXX-XXX-XXXX",
      email: "hello@flowforge.systems",
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
