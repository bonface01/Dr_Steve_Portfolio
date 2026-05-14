import { EventCard } from "@/components/EventCard";
import { PageTransition, Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { events } from "@/lib/content";

const types = ["Conferences", "Workshops", "Lectures", "PDC events", "University activities"];

export const metadata = {
  title: "Events",
  description: "Conferences, workshops, lectures, PDC events, and university activities."
};

export default function EventsPage() {
  return (
    <PageTransition>
      <Section
        dark
        className="pt-36"
        eyebrow="Events"
        title="A living archive of lectures, workshops, PDC forums, and university activities."
        intro="Each event supports image galleries and moderated comments, ready for CMS publishing."
      >
        <div className="mb-8 flex flex-wrap gap-2">
          {types.map((type) => (
            <span key={type} className="rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm font-bold text-white/76">
              {type}
            </span>
          ))}
        </div>
        <div className="grid gap-6">
          {events.map((event, index) => (
            <Reveal key={event.id} delay={index * 0.08}>
              <EventCard event={event} />
            </Reveal>
          ))}
        </div>
      </Section>
    </PageTransition>
  );
}
