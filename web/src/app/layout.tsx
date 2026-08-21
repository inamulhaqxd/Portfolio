import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const SITE_URL = "https://inamtariq.vercel.app";

export const metadata: Metadata = {
  title: {
    default: "Inam ul Haq Tariq - AI/ML Engineer",
    template: "%s | Inam ul Haq Tariq",
  },
  description: "AI/ML engineer specializing in intelligent automation, computer vision, NLP, and LLM/RAG integration. Building systems that streamline workflows and boost productivity.",
  keywords: ["AI", "ML", "machine learning", "artificial intelligence", "automation", "computer vision", "NLP", "LLM", "RAG", "Python", "FastAPI", "Deep Learning"],
  authors: [{ name: "Inam ul Haq Tariq" }],
  creator: "Inam ul Haq Tariq",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Inam ul Haq Tariq",
    title: "Inam ul Haq Tariq - AI/ML Engineer",
    description: "AI/ML engineer specializing in intelligent automation. I build systems that streamline workflows and boost productivity.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Inam ul Haq Tariq - AI/ML Engineer",
    description: "AI/ML engineer specializing in intelligent automation. I build systems that streamline workflows and boost productivity.",
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
  return (
    <html lang="en" className={`${spaceGrotesk.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
