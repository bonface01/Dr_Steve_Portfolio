import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { FirebaseAnalytics } from "@/components/FirebaseAnalytics";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://dr-steve-portfolio.vercel.app"),
  title: {
    default: "Steve Muthusi, PhD | Psychologist, Lecturer, Leadership Mentor",
    template: "%s | Steve Muthusi, PhD"
  },
  description:
    "Academic psychology, research, consultation, leadership mentorship, commentaries, and PDC initiatives for Steve Muthusi, PhD.",
  keywords: [
    "Steve Muthusi",
    "Psychology",
    "University of Nairobi",
    "Leadership mentor",
    "PDC",
    "mentorship",
    "commentaries",
    "consultation",
    "Academic portfolio"
  ],
  openGraph: {
    title: "Steve Muthusi, PhD",
    description:
      "Psychologist, Lecturer, and Leadership Mentor affiliated with the University of Nairobi Psychology Department.",
    type: "website",
    images: [
      {
        url: "/brand/hero-speaking-wide.jpg",
        width: 1200,
        height: 630,
        alt: "Steve Muthusi speaking during a PDC leadership gathering"
      }
    ]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <FirebaseAnalytics />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
