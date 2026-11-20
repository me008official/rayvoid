import { Geist, Geist_Mono, Orbitron } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const aclonica = Orbitron({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-aclonica',
});


export const metadata = {
  metadataBase: new URL("https://rayvoid.vercel.app"),
  title: {
    default: "Digital Agency in Siliguri | RAYVOID",
    template: "%s | RAYVOID",
  },
  description:
    "RAYVOID is a Siliguri-based digital agency for custom websites, mobile apps, SEO, digital marketing, social media management and digital products.",
  applicationName: "RAYVOID",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "RAYVOID",
    title: "Digital Agency in Siliguri | RAYVOID",
    description:
      "Custom web and app development, search optimization, digital marketing and social media services from RAYVOID in Siliguri, West Bengal.",
    url: "https://rayvoid.vercel.app",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Agency in Siliguri | RAYVOID",
    description:
      "Custom web and app development, search optimization, digital marketing and social media services from RAYVOID in Siliguri, West Bengal.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": "https://rayvoid.vercel.app/#business",
        name: "RAYVOID",
        url: "https://rayvoid.vercel.app",
        description:
          "A digital agency based in Siliguri, West Bengal, offering web and app development, SEO, digital marketing, social media management and digital product services.",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Siliguri",
          addressRegion: "West Bengal",
          addressCountry: "IN",
        },
        knowsAbout: [
          "Web development",
          "Mobile app development",
          "Search engine optimization",
          "Generative engine optimization",
          "Answer engine optimization",
          "Digital marketing",
          "Social media management",
          "Digital product development",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://rayvoid.vercel.app/#website",
        url: "https://rayvoid.vercel.app",
        name: "RAYVOID",
        inLanguage: "en-IN",
        publisher: {
          "@id": "https://rayvoid.vercel.app/#business",
        },
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased ${aclonica.variable}`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
