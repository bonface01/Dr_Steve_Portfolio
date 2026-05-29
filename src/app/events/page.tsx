import { MaybeImage } from "@/components/MaybeImage";
import { EventCard } from "@/components/EventCard";
import { PageTransition, Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { brandImages } from "@/lib/brand";
import { getEvents } from "@/lib/data";
import { splitEventsByDate } from "@/lib/events";

const types = ["Workshops", "Conferences", "Lectures", "PDC events", "Engagements", "Reflections"];

export const metadata = {
  title: "Events, Workshops & Engagements",
  description:
    "A showcase of conferences, workshops, seminars, mentorship programs, university engagements, and leadership events attended or facilitated by Dr. Steve Muthusi, PhD."
};

export const revalidate = 60;

export default async function EventsPage() {
  const events = await getEvents();
  const { upcoming, past } = splitEventsByDate(events);

  return (
    <PageTransition>
      <Section
        className="bg-surface bg-academic-wash pt-36"
        eyebrow="Events"
        title="Events, Workshops & Engagements"
        intro="A showcase of conferences, workshops, seminars, mentorship programs, university engagements, and leadership events attended or facilitated by Dr. Steve Muthusi."
      >
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_0.9fr]">
          <Reveal>
            <div className="relative aspect-[16/10] overflow-hidden rounded-[8px] shadow-institutional">
              <MaybeImage
                src={brandImages.events.src}
                alt={brandImages.events.alt}
                fill
                priority
                sizes="(min-width: 1024px) 52vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="flex flex-wrap gap-2">
              {types.map((type) => (
                <span
                  key={type}
                  className="rounded-full border border-royal/15 bg-white px-4 py-2 text-sm font-bold text-royal"
                >
                  {type}
                </span>
              ))}
            </div>
            <p className="mt-6 text-lg leading-8 text-slateText">
              A curated archive of conferences, workshops, seminars, mentorship programs, university collaborations, and reflective event summaries.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section dark eyebrow="Upcoming" title="Upcoming events.">
        {upcoming.length ? (
          <div className="grid gap-6">
            {upcoming.map((event, index) => (
              <Reveal key={event.id} delay={index * 0.08}>
                <EventCard event={event} status="Upcoming Event" />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="rounded-[8px] border border-white/15 bg-white/8 p-6 text-white/75">
            No upcoming events are currently published.
          </div>
        )}
      </Section>

      <Section eyebrow="Past Events" title="Reflections and previous engagements.">
        <div className="grid gap-6">
          {past.map((event, index) => (
            <Reveal key={event.id} delay={index * 0.08}>
              <EventCard event={event} status="Past Event" tone="light" />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-surface" eyebrow="Event Gallery" title="Selected moments from The Inner Shift.">
        <div className="grid gap-4 md:grid-cols-4">
          {brandImages.gallery.map((image, index) => (
            <Reveal key={image.src} delay={index * 0.06}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[8px] shadow-institutional">
                <MaybeImage
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 768px) 25vw, 100vw"
                  className="object-cover transition duration-700 hover:scale-105"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </PageTransition>
  );
}
