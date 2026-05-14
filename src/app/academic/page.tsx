import { Download, GraduationCap } from "lucide-react";
import { PageTransition, Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { publications } from "@/lib/content";

const courses = [
  "Introduction to Psychology",
  "Personality and Human Development",
  "Counseling Psychology",
  "Research Methods in Psychology",
  "Leadership, Mentorship, and Personal Development"
];

const research = [
  "Leadership formation and emerging adulthood",
  "Mental wellness and resilience",
  "Education, identity, and motivation",
  "Community psychology and mentorship practice"
];

export default function AcademicPage() {
  return (
    <PageTransition>
      <Section
        className="bg-surface bg-academic-wash pt-36"
        eyebrow="Academic Profile"
        title="University of Nairobi Psychology Department"
        intro="A refined academic profile for teaching, research interests, publications, and scholarly contribution."
      >
        <Reveal className="grid gap-6 rounded-[8px] bg-royal p-8 text-white shadow-institutional lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <GraduationCap className="h-12 w-12 text-white" />
            <h2 className="mt-6 font-heading text-4xl">Affiliation</h2>
          </div>
          <p className="text-lg leading-9 text-white/76">
            Steve Muthusi, PhD, is affiliated with the University of Nairobi
            Psychology Department, contributing to student formation, academic
            reflection, and the public understanding of psychology.
          </p>
        </Reveal>
      </Section>

      <Section eyebrow="Teaching" title="Courses and learning areas.">
        <div className="grid gap-4 md:grid-cols-2">
          {courses.map((course) => (
            <Reveal key={course}>
              <div className="rounded-[8px] border border-navy/10 bg-white p-5 shadow-institutional">
                <p className="font-semibold text-navy">{course}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-surface" eyebrow="Research" title="Research interests.">
        <div className="grid gap-5 md:grid-cols-2">
          {research.map((item) => (
            <Reveal key={item}>
              <article className="rounded-[8px] border border-navy/10 bg-white p-6">
                <h3 className="font-heading text-3xl text-navy">{item}</h3>
                <p className="mt-3 text-sm leading-6 text-slateText">
                  Inquiry area connecting psychological theory, lived context, and practical leadership.
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section eyebrow="Publications" title="Selected publications and PDF resources.">
        <div className="grid gap-4">
          {publications.map((publication) => (
            <Reveal key={publication.title}>
              <a
                href={publication.pdfUrl}
                className="flex flex-col justify-between gap-4 rounded-[8px] border border-navy/10 bg-white p-6 shadow-institutional transition hover:-translate-y-0.5 md:flex-row md:items-center"
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
