import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { PageTransition, Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { StatsCounter } from "@/components/StatsCounter";
import { profile } from "@/lib/content";

const programs = [
  "Personal leadership intensives",
  "Student mentorship cohorts",
  "Professional growth workshops",
  "Values-based public leadership forums"
];

export default function LeadershipPage() {
  return (
    <PageTransition>
      <Section
        dark
        className="pt-36"
        eyebrow="PDC"
        title="Personal Development and Leadership with depth, discipline, and service."
        intro="PDC is the leadership platform connected to Dr. Muthusi's psychology-informed approach to identity, maturity, and influence."
      >
        <Reveal className="glass rounded-[8px] p-8">
          <p className="max-w-4xl text-lg leading-9 text-white/76">
            PDC helps people translate self-awareness into practical formation. Its
            work is intentionally human: clarify identity, strengthen character,
            build useful habits, and prepare leaders to serve institutions,
            communities, and families with maturity.
          </p>
          <Link
            href={profile.pdcUrl}
            target="_blank"
            className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-5 text-sm font-bold text-royal transition hover:-translate-y-0.5 hover:bg-surface"
          >
            Visit PDC <ExternalLink className="h-4 w-4" />
          </Link>
        </Reveal>
      </Section>

      <Section eyebrow="Programs" title="Initiatives designed for practical growth.">
        <div className="grid gap-5 md:grid-cols-2">
          {programs.map((program, index) => (
            <Reveal key={program} delay={index * 0.08}>
              <article className="rounded-[8px] border border-navy/10 bg-white p-7 shadow-institutional">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-royal">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 font-heading text-3xl text-navy">{program}</h3>
                <p className="mt-3 leading-7 text-slateText">
                  A structured experience that blends psychology, reflection, group learning, and action.
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-surface" eyebrow="Impact" title="Measured by formation, not noise.">
        <div className="grid gap-5 md:grid-cols-3">
          <StatsCounter value={1200} label="Participants reached" />
          <StatsCounter value={40} label="Workshops and forums" />
          <StatsCounter value={12} label="Mentorship cohorts" />
        </div>
      </Section>
    </PageTransition>
  );
}
