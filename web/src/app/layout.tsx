import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const SITE_URL = "https://inamtariq.vercel.app";

export const metadata: Metadata = {
  title: {
    default: "Inam ul Haq Tariq - AI Engineer",
    template: "%s | Inam ul Haq Tariq",
  },
  description:
    "Interactive portfolio with an AI-powered interface that answers questions about me, my skills, and my experience",
  keywords: [
    "AI Engineer",
    "Portfolio",
    "Machine Learning",
    "NLP",
    "Computer Vision",
    "LLMs",
    "RAG",
    "Python",
    "Next.js",
  ],
  authors: [{ name: "Inam ul Haq Tariq" }],
  creator: "Inam ul Haq Tariq",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Inam ul Haq Tariq",
    title: "Inam ul Haq Tariq - AI Engineer",
    description:
      "Interactive portfolio with an AI-powered interface that answers questions about me",
  },
  twitter: {
    card: "summary_large_image",
    title: "Inam ul Haq Tariq - AI Engineer",
    description:
      "Interactive portfolio with an AI-powered interface that answers questions about me",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} light h-full antialiased`}>
      <body className="min-h-full">
        {children}
      </body>
    </html>
  );
}
