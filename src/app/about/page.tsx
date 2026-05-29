import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { PageTransition, Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { SocialLinks } from "@/components/SocialLinks";
import { brandImages } from "@/lib/brand";

const values = ["Dignity", "Self-awareness", "Service", "Excellence"];

const identity = [
  ["Role", "Psychologist, lecturer, researcher, mentor, and leadership development practitioner."],
  ["Affiliation", "University of Nairobi Psychology Department."],
  ["Platform", "PDC: personal development, mentorship, and leadership formation."],
  ["Focus", "Human growth, emotional well-being, academic excellence, and transformational leadership."]
];

export default function AboutPage() {
  return (
    <PageTransition>
      <Section
        className="bg-surface bg-academic-wash pt-36"
        eyebrow="About"
        title="A psychology-centered profile shaped by scholarship, mentorship, and human development."
        intro="Steve Muthusi, PhD, works where academic psychology meets personal growth, emotional formation, and responsible leadership."
      >
        <div className="grid items-center gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[8px] shadow-institutional">
              <Image
                src={brandImages.about.src}
                alt={brandImages.about.alt}
                fill
                priority
                sizes="(min-width: 1024px) 38vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-xl leading-9 text-slateText">
              Dr Steve Muthusi, a published scholar in cognitive and behavioral science and the author of “Start-Up Your Potential,” is a lecturer at the University of Nairobi and a consulting psychologist for various institutions.
            </p>
            <p className="mt-5 text-xl leading-9 text-slateText">
              Driven by a deep passion for growth and transformation, he dedicates his work to inspiring, challenging, and empowering individuals and organizations to reach their highest potential.
            </p>
            <p className="mt-5 text-xl leading-9 text-slateText">
              Through Personal Development Challenge International (PDC) and Mind Space Network, Dr Steve Muthusi creates intentional spaces for self-awareness, purpose-driven growth, and meaningful connection.
            </p>
            <p className="mt-5 text-xl leading-9 text-slateText">
              His work seamlessly bridges personal and professional development, equipping individuals with the clarity, resilience, and strategies needed to mindfully navigate and thrive in a fast-paced world.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {identity.map(([label, text]) => (
                <div key={label} className="rounded-[8px] border border-royal/10 bg-white p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-royal">{label}</p>
                  <p className="mt-3 text-sm leading-6 text-slateText">{text}</p>
                </div>
              ))}
            </div>
            <SocialLinks className="mt-6" tone="dark" showHandle />
          </Reveal>
        </div>
      </Section>

      <Section eyebrow="Mission, Vision & Philosophy" title="To inspire growth, transformation, and human potential through psychology, education, mentorship, and leadership development.">
        <div className="grid gap-5 lg:grid-cols-3">
          {[
            [
              "Mission",
              "Advance human growth, emotional well-being, academic excellence, and leadership transformation through grounded psychological practice."
            ],
            [
              "Vision",
              "Support students, professionals, and communities with mentorship that is rigorous, compassionate, and evidence-informed."
            ],
            [
              "Philosophy",
              "Empowering minds, nurturing growth, and transforming lives through psychology, mentorship, and purposeful leadership."
            ]
          ].map(([title, text], index) => (
            <Reveal key={title} delay={index * 0.06}>
              <article className="h-full rounded-[8px] border border-royal/10 bg-white p-7 shadow-institutional">
                <h2 className="font-heading text-4xl text-navy">{title}</h2>
                <p className="mt-4 leading-8 text-slateText">{text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-surface" eyebrow="Values" title="The principles behind the work.">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <Reveal key={value}>
              <div className="rounded-[8px] border border-royal/10 bg-white p-6">
                <CheckCircle2 className="h-7 w-7 text-royal" />
                <h3 className="mt-5 font-heading text-3xl text-navy">{value}</h3>
                <p className="mt-3 text-sm leading-6 text-slateText">
                  A guiding commitment in psychology, education, consultation, and public leadership.
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </PageTransition>
  );
}
