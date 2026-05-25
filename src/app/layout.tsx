import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const BASE_URL = "https://www.philecoders.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "PhileCoders — Custom Web & Mobile App Development Company",
    template: "%s | PhileCoders",
  },
  description:
    "PhileCoders is a top-rated software development company offering custom web apps, mobile apps, UI/UX design, SEO, digital marketing, and cloud DevOps services. Trusted by 32+ clients worldwide.",
  keywords: [
    "software development company",
    "custom web development",
    "mobile app development",
    "React Next.js development",
    "UI UX design agency",
    "SEO services",
    "digital marketing agency",
    "cloud DevOps",
    "PhileCoders",
    "hire software developers",
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
      "Top-rated software development company. We build fast, scalable web apps, mobile apps, and digital solutions that grow your business.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PhileCoders — Your Ideas, Engineered" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@philecoders",
    creator: "@philecoders",
    title: "PhileCoders — Custom Web & Mobile App Development",
    description:
      "Top-rated software development company. Web apps, mobile apps, SEO & digital marketing. 32+ happy clients.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
