import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

import { CONTACT_EMAIL, SITE_URL } from "@/lib/site";

const baseUrl = SITE_URL;

const title = "Flowforge Systems - Websites & AI systems that drive growth";
const description =
  "We design and build modern websites and AI automations that turn traffic into clients and help businesses scale faster.";

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL(baseUrl),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "Flowforge Systems",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
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

// Applies the stored/system theme before first paint so dark mode never flashes light.
const themeScript = `(function(){document.documentElement.classList.add("js");try{var s=localStorage.getItem("darkMode");var d=s?s==="true":window.matchMedia("(prefers-color-scheme: dark)").matches;if(d)document.documentElement.classList.add("dark");}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Flowforge Systems",
    description:
      "Web & AI agency that designs and builds modern websites and automations that drive growth",
    url: baseUrl,
    logo: `${baseUrl}/icon`,
    ...(CONTACT_EMAIL
      ? { contactPoint: { "@type": "ContactPoint", contactType: "Sales", email: CONTACT_EMAIL } }
      : {}),
  };

  return (
    <html lang="en" className={GeistSans.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[300] focus:px-4 focus:py-2 focus:rounded-full focus:bg-primary focus:text-white focus:font-semibold focus:shadow-lg"
        >
          Skip to content
        </a>
        {children}
        {process.env.NODE_ENV === "production" && <SpeedInsights />}
      </body>
    </html>
  );
}
