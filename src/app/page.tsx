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

const heroSlides = brandImages.hero;

const portraitImage = brandImages.about.src;

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
      <section className="bg-surface text-navy">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="grid min-h-[84vh] gap-10 lg:grid-cols-[0.32fr_0.68fr] lg:items-center">
            <Reveal>
              <div className="rounded-[32px] border border-slate-200 bg-white/95 p-8 shadow-institutional ring-1 ring-slate-200/40">
                <div className="flex items-center gap-5">
                  <div className="relative h-24 w-24 overflow-hidden rounded-full border border-slate-200 bg-slate-100">
                    <Image
                      src={portraitImage}
                      alt="Professional portrait of Dr. Steve Muthusi"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.32em] text-slate-400">Psychologist • Lecturer • Mentor</p>
                    <h1 className="mt-4 max-w-xl font-heading text-5xl leading-tight text-navy sm:text-6xl">
                      Steve Muthusi, PhD
                    </h1>
                  </div>
                </div>

                <div className="mt-10 space-y-5">
                  <p className="inline-flex rounded-full border border-royal/15 bg-royal/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-royal">
                    Mind • Brain • Balance
                  </p>
                  <p className="max-w-2xl text-lg leading-8 text-slate-700 sm:text-xl">
                    Dr Steve Muthusi is a psychologist, university lecturer, published scholar, and leadership mentor shaping thoughtful growth with academic clarity and human depth.
                  </p>
                  <p className="max-w-2xl text-lg leading-8 text-slate-700 sm:text-xl">
                    His work bridges scholarship, consultation, and mentorship to equip individuals with resilience, insight, and purpose in fast-paced learning and leadership environments.
                  </p>
                </div>

                <div className="mt-10 grid gap-3 sm:grid-cols-2">
                  <ButtonLink href="/academia" icon={ArrowRight} className="w-full justify-center">
                    Explore Academic Work
                  </ButtonLink>
                  <ButtonLink href="/consultation" variant="ghost" className="w-full justify-center">
                    Request Consultation
                  </ButtonLink>
                </div>

                <div className="mt-8">
                  <SocialLinks className="gap-2" tone="dark" showHandle />
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="relative overflow-hidden rounded-[32px] bg-navy text-white shadow-institutional">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/20 to-transparent" />
                <div className="relative min-h-[580px] lg:min-h-[680px]">
                  <HeroImageRotator images={heroSlides} />
                </div>
                <div className="absolute inset-x-0 bottom-0 px-8 pb-10">
                  <div className="max-w-2xl rounded-[24px] border border-white/10 bg-slate-950/15 px-6 py-4 backdrop-blur-sm">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-300">Psychologist • Lecturer • Scholar • Leadership Mentor</p>
                    <p className="mt-3 text-2xl font-heading leading-tight text-white">
                      A calm, intelligent, cinematic expression of academic leadership and mentorship.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
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
              Dr Steve Muthusi is a published scholar, university lecturer, and leadership psychologist who helps ambitious learners, teams, and institutions grow with intention.
            </p>
            <p className="mt-5 max-w-2xl text-xl leading-9 text-slateText">
              His work blends evidence-based psychology, reflective teaching, and leadership mentorship to create more resilient, insightful, and purpose-driven outcomes.
            </p>
            <p className="mt-5 max-w-2xl text-xl leading-9 text-slateText">
              Through academic programming, consulting, and PDC engagement, he supports people in developing the habits, clarity, and confidence to lead with integrity.
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
