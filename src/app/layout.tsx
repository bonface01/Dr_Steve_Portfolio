import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
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
  title: {
    default: "Steve Muthusi, PhD | Psychologist, Lecturer, Leadership Mentor",
    template: "%s | Steve Muthusi, PhD"
  },
  description:
    "Premium academic portfolio, psychology profile, leadership mentorship platform, events, blog, and PDC initiatives for Steve Muthusi, PhD.",
  keywords: [
    "Steve Muthusi",
    "Psychology",
    "University of Nairobi",
    "Leadership mentor",
    "PDC",
    "Academic portfolio"
  ],
  openGraph: {
    title: "Steve Muthusi, PhD",
    description:
      "Psychologist, Lecturer, and Leadership Mentor affiliated with the University of Nairobi Psychology Department.",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Academic leadership gathering"
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
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
