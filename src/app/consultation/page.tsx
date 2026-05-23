import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass, Handshake, Sprout, UsersRound } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { PageTransition, Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { brandImages } from "@/lib/brand";
import { profile } from "@/lib/content";

const services = [
  {
    title: "PDC Mentorship",
    text: "Structured personal development conversations for identity, purpose, habits, and responsibility.",
    icon: UsersRound
  },
  {
    title: "Life Coaching",
    text: "Reflective guidance for emotional clarity, personal growth, decision making, and transition moments.",
    icon: Sprout
  },
  {
    title: "Leadership Development",
    text: "Psychology-informed leadership formation for students, professionals, teams, and community builders.",
    icon: Compass
  },
  {
    title: "Student Guidance",
    text: "Mentorship for academic direction, resilience, self-awareness, and emerging adult development.",
    icon: Handshake
  }
];

export const metadata = {
  title: "Consultation",
  description:
    "PDC mentorship, life coaching, leadership development, personal growth, and student guidance with Steve Muthusi, PhD."
};

export default function ConsultationPage() {
  return (
    <PageTransition>
      <Section
        className="bg-surface bg-academic-wash pt-36"
        eyebrow="Consultation"
        title="Mentorship, coaching, and leadership development grounded in psychology."
        intro="Consultation brings together PDC, student guidance, personal growth, and leadership formation in a calm, reflective process."
      >
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_0.9fr]">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[8px] shadow-institutional">
              <Image
                src={brandImages.consultation.src}
                alt={brandImages.consultation.alt}
                fill
                priority
                sizes="(min-width: 1024px) 52vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-lg leading-8 text-slateText">
              Through PDC, Dr. Muthusi supports people and groups seeking deeper
              self-awareness, emotional maturity, disciplined growth, and meaningful
              contribution. The work is human-centered, reflective, and practical.
            </p>
            <Link
              href={profile.pdcUrl}
              target="_blank"
              className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-full bg-royal px-5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-institutional"
            >
              Visit PDC <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </Section>

      <Section eyebrow="Practice Areas" title="Where consultation can support growth.">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <Reveal key={service.title} delay={index * 0.06}>
              <article className="h-full rounded-[8px] border border-royal/10 bg-white p-6 shadow-institutional">
                <service.icon className="h-8 w-8 text-royal" />
                <h2 className="mt-5 font-heading text-3xl text-navy">{service.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slateText">{service.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-surface" eyebrow="Request" title="Begin a consultation conversation.">
        <ContactForm />
      </Section>
    </PageTransition>
  );
}
