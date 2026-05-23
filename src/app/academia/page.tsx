import Image from "next/image";
import Link from "next/link";
import { ClipboardList, Download, ExternalLink, GraduationCap } from "lucide-react";
import { PageTransition, Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { brandImages } from "@/lib/brand";
import { publications } from "@/lib/content";

const courses = [
  {
    title: "Introduction to Psychology",
    description:
      "Foundational principles of psychology, human behavior, cognition, and psychological theories."
  },
  {
    title: "Cognitive Psychology",
    description:
      "Study of mental processes including memory, learning, perception, reasoning, and decision-making."
  },
  {
    title: "Psychology of Human Growth & Development",
    description:
      "Examination of physical, emotional, cognitive, and social development across the human lifespan."
  }
];

const research = [
  {
    title: "Leadership formation and emerging adulthood",
    description:
      "Scholarship exploring how young adults develop values, identity, and psychological maturity for responsible leadership."
  },
  {
    title: "Mental wellness and resilience",
    description:
      "Research into psychological wellbeing, stress regulation, and resilience in academic and professional settings."
  },
  {
    title: "Education, identity, and motivation",
    description:
      "Inquiry into the psychological factors that shape learning, motivation, and educational engagement."
  },
  {
    title: "Community psychology and mentorship practice",
    description:
      "Field engagement with mentorship, community support, and contexts that shape human development."
  }
];

const researchParticipationLinks = [
  {
    title: "Research participation form",
    text: "Connect Google Forms here for student, community, or leadership research participation.",
    href: "https://forms.google.com"
  },
  {
    title: "Data collection request",
    text: "Use this slot for approved data collection, fieldwork, or questionnaire links.",
    href: "https://forms.google.com"
  }
];

export const metadata = {
  title: "Academia",
  description:
    "Teaching, research, publications, academic interests, and research participation links for Steve Muthusi, PhD."
};

export default function AcademiaPage() {
  return (
    <PageTransition>
      <Section
        className="bg-surface bg-academic-wash pt-36"
        eyebrow="Academia"
        title="Psychology teaching, research, and scholarly formation."
        intro="A faculty-style academic profile for coursework, publications, research interests, and research participation support."
      >
        <Reveal className="grid items-center gap-8 rounded-[8px] bg-white p-6 shadow-institutional lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[8px]">
            <Image
              src={brandImages.academia.src}
              alt={brandImages.academia.alt}
              fill
              priority
              sizes="(min-width: 1024px) 44vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="p-2 lg:p-6">
            <GraduationCap className="h-10 w-10 text-royal" />
            <h2 className="mt-5 font-heading text-4xl text-navy">
              University of Nairobi Psychology Department
            </h2>
            <p className="mt-4 text-lg leading-8 text-slateText">
              Dr. Muthusi's academic work connects psychological theory, teaching,
              research, and mentorship with the lived questions of students,
              communities, and emerging leaders.
            </p>
          </div>
        </Reveal>
      </Section>

      <Section eyebrow="Teaching" title="Courses and learning areas.">
        <div className="grid gap-5 md:grid-cols-3">
          {courses.map((course, index) => (
            <Reveal key={course.title} delay={index * 0.06}>
              <article className="rounded-[8px] border border-royal/10 bg-white p-6 shadow-institutional">
                <h3 className="font-heading text-2xl text-navy">{course.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slateText">{course.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-surface" eyebrow="Current Research & Data Collection" title="Ongoing academic research initiatives.">
        <p className="mb-8 max-w-3xl text-sm leading-7 text-slateText">
          Ongoing academic and psychological research initiatives are conducted through collaborative studies, field engagement, and data collection activities.
        </p>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-2">
          {research.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.06}>
              <article className="h-full rounded-[8px] border border-royal/10 bg-white p-6 shadow-institutional">
                <h3 className="font-heading text-3xl text-navy">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slateText">{item.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section eyebrow="Research Participation" title="Data collection and study support.">
        <p className="mb-8 max-w-3xl text-sm leading-7 text-slateText">
          Google Forms and research participation links are provided for approved academic studies, questionnaire engagement, and collaborative fieldwork.
        </p>
        <div className="grid gap-5 md:grid-cols-2">
          {researchParticipationLinks.map((item) => (
            <Reveal key={item.title}>
              <Link
                href={item.href}
                target="_blank"
                className="block rounded-[8px] border border-royal/10 bg-white p-6 shadow-institutional transition hover:-translate-y-0.5"
              >
                <ClipboardList className="h-8 w-8 text-royal" />
                <h3 className="mt-5 font-heading text-3xl text-navy">{item.title}</h3>
                <p className="mt-3 leading-7 text-slateText">{item.text}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-royal">
                  Open form <ExternalLink className="h-4 w-4" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-surface" eyebrow="Publications" title="Selected publications and PDF resources.">
        <div className="grid gap-4">
          {publications.map((publication) => (
            <Reveal key={publication.title}>
              <a
                href={publication.pdfUrl}
                className="flex flex-col justify-between gap-4 rounded-[8px] border border-royal/10 bg-white p-6 shadow-institutional transition hover:-translate-y-0.5 md:flex-row md:items-center"
              >
                <div>
                  <h3 className="font-heading text-2xl text-navy">{publication.title}</h3>
                  <p className="mt-2 text-sm text-slateText">
                    {publication.venue} - {publication.year}
                  </p>
                </div>
                <span className="inline-flex items-center gap-2 text-sm font-bold text-royal">
                  <Download className="h-4 w-4" /> PDF
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </Section>
    </PageTransition>
  );
}
