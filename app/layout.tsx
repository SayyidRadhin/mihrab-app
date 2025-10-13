import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import GlobalContextProvider from "./contexts/globalContext";


const RalewayFont = Raleway({
  subsets: ['latin'],
  display: "swap",
  variable: "--font-raleway",
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: "Mehrab Academy | Learn Online Anytime",
  description: "Join Mehrab Academy, your online learning platform offering courses, guidance, and resources for students to excel academically.",
  alternates: {
    canonical: "https://www.mehrabacademy.com/",
  },
  openGraph: {
    type: "website",
    url: "https://www.mehrabacademy.com/",
    title: "Mehrab Academy | Learn Online Anytime",
    description: "Join Mehrab Academy, your online learning platform offering courses and resources for students to excel academically.",
    images: [
      {
        url: "https://www.mehrabacademy.com/og-image.jpg",
      },
    ],
    locale: "en_IN",
  },
  keywords: [
    "Mehrab Academy",
    "online learning",
    "courses",
    "education",
    "Madrasa Education",
    "Quran Learning Online",
    "Quran Memorizing"
  ],
  twitter: {
    card: "summary_large_image",
    title: "Mehrab Academy | Learn Online Anytime",
    description: "Learn online at Mehrab Academy — explore courses and improve your skills anytime, anywhere.",
    images: ["https://www.mehrabacademy.com/og-image.jpg"],
    creator: "@mehrabacademy",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${RalewayFont.variable} antialiased`}>
        <GlobalContextProvider>
          {children}
        </GlobalContextProvider>
      </body>
    </html>
  );
}