import type { Metadata } from "next";
import { Anek_Malayalam, Inter, Bungee, Raleway } from "next/font/google";
import "./globals.css";
import GlobalContextProvider from "./contexts/globalContext";

const inter = Inter({ subsets: ["latin"] });

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
    canonical: "https://www.mehrabacademy.in/",
  },
  openGraph: {
    type: "website",
    url: "https://www.mehrabacademy.in/",
    title: "Mehrab Academy | Learn Online Anytime",
    description: "Join Mehrab Academy, your online learning platform offering courses and resources for students to excel academically.",
    images: [
      {
        url: "https://www.mehrabacademy.in/og-image.jpg",
      },
    ],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mehrab Academy | Learn Online Anytime",
    description: "Learn online at Mehrab Academy — explore courses and improve your skills anytime, anywhere.",
    images: ["https://www.mehrabacademy.in/og-image.jpg"],
    creator: "@mehrabacademy",
  },
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