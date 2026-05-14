import Image from "next/image";
import { ArrowRight, BookOpen, Mail, Newspaper } from "lucide-react";
import { BlogCard } from "@/components/BlogCard";
import { ButtonLink } from "@/components/ButtonLink";
import { EventCarousel } from "@/components/EventCarousel";
import { PageTransition, Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { StatsCounter } from "@/components/StatsCounter";
import { blogPosts, events, featuredAreas, testimonials } from "@/lib/content";

export default function HomePage() {
  const featuredEvents = events.filter((event) => event.featured);
  const latestPosts = blogPosts.slice(0, 3);

  return (
    <PageTransition>
      <section className="relative min-h-[94vh] overflow-hidden bg-royal px-4 pb-14 pt-36 text-white sm:px-6 lg:px-8">
        <Image
          src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1800&q=80"
          alt="Academic and leadership conversation"
          fill
          priority
          className="object-cover opacity-28"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-royal/72 via-royal/70 to-institutional" />
        <div className="relative mx-auto grid max-w-7xl items-end gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.34em] text-white">
              Psychology - Academia - Leadership
            </p>
            <h1 className="max-w-4xl font-heading text-6xl leading-[0.95] sm:text-7xl lg:text-8xl">
              Steve Muthusi, PhD
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-8 text-white/76">
              Psychologist, lecturer, and leadership mentor shaping reflective practice,
              scholarly excellence, and purposeful influence through PDC.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/about" icon={ArrowRight}>Explore Profile</ButtonLink>
              <ButtonLink href="/blog" variant="secondary" icon={Newspaper}>View Blog</ButtonLink>
              <ButtonLink href="/contact" variant="secondary" icon={Mail}>Contact</ButtonLink>
            </div>
          </Reveal>
          <Reveal delay={0.12} className="glass rounded-[8px] p-5 institutional-ring">
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {[
                ["University", "University of Nairobi Psychology Department"],
                ["Platform", "PDC personal development and leadership"],
                ["Focus", "Mental wellness, mentorship, and leadership formation"]
              ].map(([label, text]) => (
                <div key={label} className="rounded-[8px] bg-white/10 p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-white">{label}</p>
                  <p className="mt-3 text-sm leading-6 text-white/76">{text}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <Section
        eyebrow="About"
        title="A calm, scholarly voice for human growth and responsible leadership."
        intro="Dr. Muthusi's work brings together psychology, university teaching, mentorship, and leadership formation for students, professionals, and communities."
        className="bg-surface bg-academic-wash"
      >
        <div className="grid gap-6 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Reveal className="h-full rounded-[8px] border border-navy/10 bg-white/70 p-8 shadow-institutional">
              <BookOpen className="h-10 w-10 text-royal" />
              <h2 className="mt-6 font-heading text-4xl text-navy">Profile Preview</h2>
              <p className="mt-4 leading-8 text-slateText">
                As a psychologist and lecturer, Steve Muthusi, PhD, works at the
                meeting point of human behavior, learning, purpose, and influence.
                His leadership platform, PDC, translates psychological insight into
                practical mentorship and personal development.
              </p>
              <div className="mt-6">
                <ButtonLink href="/about" variant="ghost">Read biography</ButtonLink>
              </div>
            </Reveal>
          </div>
          <div className="grid gap-4 lg:col-span-2">
            <StatsCounter value={15} label="Years mentoring leaders" />
            <StatsCounter value={1200} label="Learners and leaders reached" />
          </div>
        </div>
      </Section>

      <Section
        eyebrow="Featured Areas"
        title="Psychology, leadership, and academia held in one coherent brand."
        intro="Each area is designed to feel distinct, but all point toward a single conviction: people grow best when insight becomes disciplined action."
      >
        <div className="grid gap-5 md:grid-cols-3">
          {featuredAreas.map((area, index) => (
            <Reveal key={area.title} delay={index * 0.08}>
              <article className="group overflow-hidden rounded-[8px] border border-navy/10 bg-white shadow-institutional">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={area.image}
                    alt={area.title}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-3xl text-navy">{area.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slateText">{area.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        dark
        eyebrow="Events"
        title="Conversations, lectures, and leadership gatherings."
        intro="A curated view of upcoming and recent events across PDC, university activity, public psychology lectures, and workshops."
      >
        <Reveal>
          <EventCarousel events={featuredEvents} />
        </Reveal>
      </Section>

      <Section
        eyebrow="Latest Insights"
        title="Writing on psychology, leadership, education, and wellness."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {latestPosts.map((post, index) => (
            <Reveal key={post.id} delay={index * 0.08}>
              <BlogCard post={post} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        className="bg-surface"
        eyebrow="Testimonials"
        title="A reputation built through teaching, mentorship, and trust."
      >
        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.id} delay={index * 0.08}>
              <figure className="h-full rounded-[8px] border border-navy/10 bg-white p-6 shadow-institutional">
                <blockquote className="text-lg leading-8 text-navy">"{testimonial.quote}"</blockquote>
                <figcaption className="mt-6 text-sm text-slateText">
                  <strong className="block text-navy">{testimonial.name}</strong>
                  {testimonial.role}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Section>
    </PageTransition>
  );
}
