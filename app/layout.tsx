import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import GlobalContextProvider from "./contexts/globalContext";
import Script from "next/script";

const RalewayFont = Raleway({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-raleway",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Mehrab Academy | Learn Anytime",
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
    "Quran Memorizing",
    "Hifz Quran Online",
    "Online Quran Classes",
    "Academic Courses Online",
    "E-learning",
  ],
  twitter: {
    card: "summary_large_image",
    title: "Mehrab Academy | Learn Online Anytime",
    description: "Learn online at Mehrab Academy — explore courses and improve your skills anytime, anywhere.",
    images: ["https://www.mehrabacademy.com/og-image.jpg"],
    creator: "@mehrabacademy",
  },
};

// Define JSON-LD scripts as components
const WebPageSchema = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Mehrab Academy Homepage",
        url: "https://www.mehrabacademy.in/",
        description:
          "Explore knowledge beyond classrooms with Mehrab Academy. Join our online learning platform to access madrasa education and academic courses anytime, anywhere.",
        publisher: {
          "@type": "Organization",
          name: "Mehrab Academy",
          logo: {
            "@type": "ImageObject",
            url: "https://www.mehrabacademy.in/mihrabLogo.png",
          },
        },
      }),
    }}
  />
);

const FAQPageSchema = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What is Mehrab Academy?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Mehrab Academy is an online learning platform offering madrasa education and academic courses anytime, anywhere.",
            },
          },
          {
            "@type": "Question",
            name: "How can I join Mehrab Academy?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Visit our Join Now page to enroll in our online courses and start learning with Mehrab Academy.",
            },
          },
        ],
      }),
    }}
  />
);

const SoftwareAppSchema = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "Mehrab Hifz App",
        operatingSystem: "Android, iOS",
        applicationCategory: "Education",
        offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
        downloadUrl: "https://play.google.com/store/apps/details?id=mehrab.hifz",
        description: "Learn and memorize the Quran through interactive online lessons from Mehrab Academy.",
        publisher: { "@type": "Organization", name: "Mehrab Academy" },
      }),
    }}
  />
);

const CourseListSchema = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: [
          {
            "@type": "Course",
            name: "Online Madrasa Education",
            description:
              "Online madrasa merges tradition with technology, teaching Islamic studies from Grade 1 to Plus Two.",
            provider: {
              "@type": "Organization",
              name: "Mehrab Academy",
              sameAs: "https://www.mehrabacademy.in/",
            },
          },
          {
            "@type": "Course",
            name: "Quran Memorization",
            description:
              "Memorize the Qur'an from home with our Online Hifz programs, offering flexible and personalized learning.",
            provider: {
              "@type": "Organization",
              name: "Mehrab Academy",
              sameAs: "https://www.mehrabacademy.in/",
            },
          },
        ],
      }),
    }}
  />
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* JSON-LD Scripts */}
        <WebPageSchema />
        <FAQPageSchema />
        <SoftwareAppSchema />
        <CourseListSchema />
      </head>
      <body className={`${RalewayFont.variable} antialiased`}>
        <GlobalContextProvider>{children}</GlobalContextProvider>
      </body>
    </html>
  );
}