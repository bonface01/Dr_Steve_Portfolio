import Image from "next/image";
import { ArrowRight, Brain, GraduationCap, Handshake, MessageSquareText } from "lucide-react";
import { BlogCard } from "@/components/BlogCard";
import { ButtonLink } from "@/components/ButtonLink";
import { EventCard } from "@/components/EventCard";
import { HeroImageRotator } from "@/components/HeroImageRotator";
import { PageTransition, Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { SocialLinks } from "@/components/SocialLinks";
import { StatsCounter } from "@/components/StatsCounter";
import { brandImages } from "@/lib/brand";
import { getBlogPosts, getEvents } from "@/lib/data";
import { splitEventsByDate } from "@/lib/events";

export const revalidate = 60;

const pillars = [
  {
    title: "Mind",
    text: "Psychological insight for emotional intelligence, behavior, identity, and meaning.",
    icon: Brain
  },
  {
    title: "Brain",
    text: "Research-minded teaching that connects cognition, learning, development, and wellbeing.",
    icon: GraduationCap
  },
  {
    title: "Coaching",
    text: "Mentorship, student guidance, life coaching, and leadership development through PDC.",
    icon: Handshake
  },
  {
    title: "Development",
    text: "Human growth, academic excellence, youth empowerment, and transformational leadership.",
    icon: MessageSquareText
  }
];

export default async function HomePage() {
  const [posts, events] = await Promise.all([getBlogPosts(), getEvents()]);
  const latestPosts = posts.slice(0, 3);
  const { upcoming, past } = splitEventsByDate(events);
  const featuredEvent = upcoming[0] ?? past[0];

  return (
    <PageTransition>
      <section className="relative min-h-[96vh] overflow-hidden bg-royal px-4 pb-16 pt-36 text-white sm:px-6 lg:px-8">
        <HeroImageRotator images={brandImages.hero} />
        <div className="absolute inset-0 bg-gradient-to-b from-royal/86 via-royal/72 to-institutional/95" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white to-transparent" />

        <div className="relative mx-auto flex min-h-[68vh] max-w-7xl items-end">
          <Reveal className="max-w-5xl">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.34em] text-white/82">
              Academic Psychology - Leadership Development - PDC
            </p>
            <h1 className="font-heading text-6xl leading-[0.95] sm:text-7xl lg:text-8xl">
              Steve Muthusi, PhD
            </h1>
            <p className="mt-5 font-heading text-3xl text-white/92 sm:text-4xl">
              Mind • Brain • Coaching • Development
            </p>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-white/78 sm:text-xl">
              Psychologist, university lecturer, researcher, mentor, and leadership
              development practitioner dedicated to advancing human growth,
              emotional well-being, academic excellence, and transformational leadership.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/academia" icon={ArrowRight}>Explore Academic Work</ButtonLink>
              <ButtonLink href="/consultation" variant="secondary">Leadership & Mentorship</ButtonLink>
              <ButtonLink href="/consultation" variant="secondary">Contact / Consultation</ButtonLink>
            </div>
            <SocialLinks className="mt-6" />
          </Reveal>
        </div>
      </section>

      <Section
        className="bg-white pt-16"
        eyebrow="Platform"
        title="A psychology-oriented platform for learning, formation, and thoughtful leadership."
        intro="The work brings together academic psychology, mentoring practice, research, consultation, and reflective public education."
      >
        <div className="grid gap-4 md:grid-cols-4">
          {pillars.map((pillar, index) => (
            <Reveal key={pillar.title} delay={index * 0.06}>
              <article className="h-full rounded-[8px] border border-royal/10 bg-white p-6 shadow-institutional">
                <pillar.icon className="h-8 w-8 text-royal" />
                <h2 className="mt-5 font-heading text-3xl text-navy">{pillar.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slateText">{pillar.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-surface" eyebrow="About" title="A psychology-centered approach to academic growth and mentorship.">
        <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[8px] shadow-institutional">
              <Image
                src={brandImages.about.src}
                alt={brandImages.about.alt}
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="max-w-2xl text-xl leading-9 text-slateText">
              Dr. Steve Muthusi is a psychologist, educator, researcher, and leadership mentor with a passion for understanding the human mind and empowering individuals toward personal and professional growth.
            </p>
            <p className="mt-5 max-w-2xl text-xl leading-9 text-slateText">
              With experience in academic instruction, mentorship, coaching, and developmental programs, his work bridges psychology, education, leadership, and human transformation.
            </p>
            <p className="mt-5 max-w-2xl text-xl leading-9 text-slateText">
              His approach combines academic rigor, practical mentorship, emotional intelligence, and people-centered development to inspire meaningful impact in students, professionals, and communities.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <StatsCounter value={15} label="Years mentoring" />
              <StatsCounter value={1200} label="Learners reached" />
              <StatsCounter value={40} label="Forums and workshops" />
            </div>
          </Reveal>
        </div>
      </Section>

      <Section
        eyebrow="Commentaries"
        title="Reflective writing on psychology, leadership, learning, and emotional growth."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {latestPosts.map((post, index) => (
            <Reveal key={post.id} delay={index * 0.08}>
              <BlogCard post={post} hrefPrefix="/commentaries" />
            </Reveal>
          ))}
        </div>
      </Section>

      {featuredEvent ? (
        <Section
          dark
          eyebrow="Events"
          title="Workshops, conferences, engagements, and leadership conversations."
          intro="Events are automatically organized as upcoming or past based on their date."
        >
          <Reveal>
            <EventCard event={featuredEvent} />
          </Reveal>
        </Section>
      ) : null}
    </PageTransition>
  );
}
