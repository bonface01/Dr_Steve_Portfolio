import { CheckCircle2 } from "lucide-react";
import { PageTransition, Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";

const timeline = [
  ["Academic Foundation", "Advanced training in psychology, research, and human development."],
  ["University Teaching", "Lecturing and mentoring students within the University of Nairobi Psychology Department."],
  ["Leadership Mentorship", "Development of PDC as a platform for personal development and leadership formation."],
  ["Public Contribution", "Speaking, writing, workshops, and community-centered psychology engagement."]
];

export default function AboutPage() {
  return (
    <PageTransition>
      <Section
        className="bg-royal pb-24 pt-36 text-white"
        eyebrow="Biography"
        title="A psychologist and mentor devoted to the formation of thoughtful, resilient leaders."
        intro="Steve Muthusi, PhD, combines academic psychology, classroom teaching, mentorship, and public leadership development with a calm professional voice."
      >
        <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <Reveal className="glass rounded-[8px] p-8">
            <p className="text-lg leading-9 text-white/78">
              Dr. Muthusi's work is shaped by a belief that human growth requires both
              insight and structure. As a psychologist, he attends to behavior,
              meaning, emotion, and relationships. As a lecturer, he helps students
              engage psychological ideas with rigor and cultural intelligence. As a
              leadership mentor, he guides people toward disciplined purpose and
              socially responsible influence.
            </p>
            <p className="mt-5 text-lg leading-9 text-white/78">
              Through PDC, his personal development and leadership platform, he
              supports learners, professionals, and emerging leaders who want to
              cultivate self-awareness, ethical responsibility, and practical habits
              for meaningful impact.
            </p>
          </Reveal>
          <Reveal delay={0.08} className="rounded-[8px] bg-white p-8 text-navy">
            <h2 className="font-heading text-4xl">Philosophy</h2>
            <p className="mt-4 leading-8 text-slateText">
              Psychology reveals the patterns that shape people. Leadership asks what
              those patterns become in the service of others. The best formation
              honors both: the inner life and the public responsibility.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section eyebrow="Career Timeline" title="A purposeful arc of scholarship, teaching, and mentorship.">
        <div className="grid gap-4">
          {timeline.map(([title, text], index) => (
            <Reveal key={title} delay={index * 0.08}>
              <article className="grid gap-4 rounded-[8px] border border-navy/10 bg-white p-6 shadow-institutional md:grid-cols-[180px_1fr]">
                <p className="font-heading text-2xl text-royal">{title}</p>
                <p className="leading-7 text-slateText">{text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-surface" eyebrow="Values" title="The principles behind the work.">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {["Dignity", "Self-awareness", "Service", "Excellence"].map((value) => (
            <Reveal key={value}>
              <div className="rounded-[8px] border border-navy/10 bg-white p-6">
                <CheckCircle2 className="h-7 w-7 text-royal" />
                <h3 className="mt-5 font-heading text-3xl text-navy">{value}</h3>
                <p className="mt-3 text-sm leading-6 text-slateText">
                  A guiding commitment in psychology, education, leadership, and public contribution.
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </PageTransition>
  );
}
