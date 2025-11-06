// app/joinnow/layout.tsx
import type { Metadata } from "next";



/* -------------------------------------------------------------------------- */
/*                              PAGE METADATA                                 */
/* -------------------------------------------------------------------------- */
export const metadata: Metadata = {
  title:
    "Quran Memorization App – Hifz Quran Online",
  description:
    "Easily Learn and Memorize Quran accurately with our Powerful Quran Hifz app. Memorize Quran completely with expert Mehrab Academy Scholars through the Hifz app Systematically. Start your journey today!",
  keywords: [
    "quran hifz online",
    "online quran memorization",
    "hifz quran app",
    "learn quran byheart online",
    "mehrab academy hifz",
    "quran memorisation course",
    "online madrasa registration",
    "hifz program india",
    "quran hifz classes",
    "memorize quran at home",
  ].join(", "),
  alternates: { canonical: "https://www.mehrabacademy.com/quranapp" },
  robots: { index: true, follow: true },

  openGraph: {
    type: "website",
    url: "https://www.mehrabacademy.com/quranapp",
    title: "Join Mehrab Academy – Online Quran Hifz Course",
    description:
      "Easily Learn and Memorize Quran accurately with our Powerful Quran Hifz app. Use our Powerful Hifz app to memorise the Quran from anywhere.",
    images: [{ url: "https://www.mehrabacademy.com/og-hifz.jpg" }],
    locale: "en_IN",
  },

  twitter: {
    card: "summary_large_image",
    title: "Join Quran Hifz Online – Mehrab Academy",
    description:
      "Start memorising the Quran today with live Scholars & our Powerful Hifz app.",
    images: ["https://www.mehrabacademy.com/og-hifz.jpg"],
    creator: "@mehrabacademy",
  },
};

/* -------------------------------------------------------------------------- */
/*                           JSON-LD COMPONENTS                               */
/* -------------------------------------------------------------------------- */
const WebPageSchema = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Quran Memorization App – Hifz Quran Online",
        url: "https://www.mehrabacademy.com/quranapp",
        description:
          "Register at Mehrab Academy to start your journey in Quran memorisation, Madrasa education, and School studies. Learn online with expert Scholars and our Powerful Hifz app.",
        publisher: {
          "@type": "EducationalOrganization",
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

const ServiceSchema = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: "Online Quran Hifz & Memorisation Registration",
        provider: {
          "@type": "EducationalOrganization",
          name: "Mehrab Academy",
          sameAs: "https://www.mehrabacademy.com/",
        },
        description:
          "Enrol in Quran Hifz, Madrasa Education, or School courses through Mehrab Academy’s online registration form. Use our free Hifz app for interactive learning.",
        url: "https://www.mehrabacademy.com/joinnow",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "INR",
          name: "Free Registration",
        },
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
        name: "Mehrab Hifz App – Quran Memorisation",
        operatingSystem: "Android, iOS",
        applicationCategory: "Education",
        offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
        downloadUrl:
          "https://play.google.com/store/apps/details?id=mehrab.hifz",
        description:
          "Learn and memorise the Quran with interactive lessons, progress tracking, and live teacher support – completely free.",
        publisher: { "@type": "Organization", name: "Mehrab Academy" },
      }),
    }}
  />
);

const CourseSchema = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Course",
        name: "Online Quran Hifz & Memorisation Program",
        description:
          "A flexible, teacher-led program to memorise the entire Quran from home. Includes daily revision, tajweed checks and a dedicated mobile app.",
        provider: {
          "@type": "EducationalOrganization",
          name: "Mehrab Academy",
          sameAs: "https://www.mehrabacademy.com/",
        },
        hasCourseInstance: {
          "@type": "CourseInstance",
          courseMode: "online",
          instructor: { "@type": "Person", name: "Certified Hifz Teachers" },
        },
      }),
    }}
  />
);

const FAQSchema = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Is the Quran Hifz course Simple?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, it is simple and you can start learning Quran Hifz online using our  Hifz app effectively.",
            },
          },
          {
            "@type": "Question",
            name: "Do I get a live teacher for Quran memorisation?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, our certified teachers guide you daily with live sessions and progress tracking.",
            },
          },
        ],
      }),
    }}
  />
);

const OrganizationSchema = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "EducationalOrganization",
        name: "Mehrab Academy",
        url: "https://www.mehrabacademy.com",
        logo: "https://www.mehrabacademy.com/mihrabLogo.png",
        sameAs: [
          "https://www.facebook.com/mehrabacademy",
          "https://www.instagram.com/mehrabacademy",
          "https://x.com/mehrabacademy"
        ],
      }),
    }}
  />
);



/* -------------------------------------------------------------------------- */
/*                               LAYOUT COMPONENT                             */
/* -------------------------------------------------------------------------- */
function CartLayout({ children }: Readonly<{ children: React.ReactNode }>) {
return (
    <html lang="en">
<head>
        {/* Structured Data – Next.js will hoist these to the document <head> */}
        <OrganizationSchema />
        <WebPageSchema />
        <ServiceSchema />
        <SoftwareAppSchema />
        <CourseSchema />
        <FAQSchema />
      </head>      
      <body >
        {children}
      </body>
    </html>
      
  );
}

export default CartLayout;