import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const BASE_URL = "https://www.philecoders.com";
const OG_IMAGE = `${BASE_URL}/og-image.png`;

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "PhileCoders — Custom Web & Mobile App Development Company",
    template: "%s | PhileCoders",
  },
  description:
    "PhileCoders is a top-rated software development company in Noida, India. We build custom web apps, mobile apps, UI/UX design, SEO & digital marketing solutions. Trusted by 32+ clients worldwide. Get a free quote today.",
  keywords: [
    "software development company India",
    "custom web development Noida",
    "mobile app development company",
    "hire React Next.js developers",
    "UI UX design agency India",
    "SEO services India",
    "digital marketing agency Noida",
    "cloud DevOps services",
    "PhileCoders",
    "web development company Noida",
    "software agency India",
  ],
  authors: [{ name: "PhileCoders", url: BASE_URL }],
  creator: "PhileCoders",
  publisher: "PhileCoders",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: { canonical: BASE_URL },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "PhileCoders",
    title: "PhileCoders — Custom Web & Mobile App Development Company",
    description:
      "Top-rated software development company in India. We build fast, scalable web apps, mobile apps, and digital solutions that grow your business. Free discovery call.",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "PhileCoders — Your Ideas, Engineered" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@philecoders",
    creator: "@philecoders",
    title: "PhileCoders — Custom Web & Mobile App Development",
    description:
      "Top-rated software dev company in India. Web apps, mobile apps, SEO & digital marketing. 32+ happy clients. Free quote.",
    images: [OG_IMAGE],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  other: {
    "msapplication-TileColor": "#0e1525",
  },
};

/* ── Site-wide JSON-LD (always present on every page) ── */
const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "PhileCoders",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo-icon.png`,
        width: 36,
        height: 28,
      },
      description:
        "PhileCoders is a software development company in Noida, India specialising in custom web apps, mobile apps, SEO, and digital marketing.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Prakash Nagar, Khora, Sector-62",
        addressLocality: "Noida",
        addressRegion: "Uttar Pradesh",
        postalCode: "201301",
        addressCountry: "IN",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+91-62021-87680",
        contactType: "customer service",
        email: "philecoders@gmail.com",
        availableLanguage: "English",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "32",
        bestRating: "5",
      },
      sameAs: [
        "https://github.com/nitishv-712",
        "https://twitter.com/philecoders",
        "https://www.instagram.com/philecoders",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "PhileCoders",
      publisher: { "@id": `${BASE_URL}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: `${BASE_URL}/services?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${BASE_URL}/#localservice`,
      name: "PhileCoders Software Development",
      image: OG_IMAGE,
      url: BASE_URL,
      telephone: "+91-62021-87680",
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Prakash Nagar, Khora, Sector-62",
        addressLocality: "Noida",
        addressRegion: "Uttar Pradesh",
        postalCode: "201301",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 28.6151,
        longitude: 77.3669,
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "32",
        bestRating: "5",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
