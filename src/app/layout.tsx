import type { Metadata } from "next";
import { DM_Sans, Geist } from 'next/font/google';
import { Analytics } from "@vercel/analytics/next"
import { cn } from "@/lib/utils";
import "@/style/globals.css";

import AppProvider from "@/provider";
import Header from "@/components/common/header";
import OnbordingHandler from "@/components/home/onbording-handler";
import { Toaster } from "@/components/ui/sonner";
import JsonLd from "@/components/seo/json-ld";
import {
  SITE_NAME,
  SITE_URL,
  SITE_DESCRIPTION,
  DEFAULT_KEYWORDS,
} from "@/constants/seo";


const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const dmSans = DM_Sans({ 
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['400', '500', '600', '700']
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Free AI Personality Game | Get Your Results in 5 Minutes`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: DEFAULT_KEYWORDS,
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "game",
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
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Free AI Personality Game`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Free AI Personality Game`,
    description: SITE_DESCRIPTION,
  },
  alternates: {
    canonical: SITE_URL,
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("light", dmSans.className, "font-sans", geist.variable)}>
      <body>
        <JsonLd />
        <Analytics />
        <AppProvider>
          <div className="flex flex-col w-full">
            <Header />
            <main className="flex-1 bg-background text-foreground">
              {children}
              <OnbordingHandler />
            </main>
          </div>
          <Toaster position="top-right" />
        </AppProvider>
      </body>
    </html>
  );
}
