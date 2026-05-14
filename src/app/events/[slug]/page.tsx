import Image from "next/image";
import { notFound } from "next/navigation";
import { CalendarDays, MapPin } from "lucide-react";
import { Comments } from "@/components/Comments";
import { PageTransition } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { events } from "@/lib/content";
import { getEventBySlug } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export const revalidate = 60;

export function generateStaticParams() {
  return events.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  return {
    title: event?.title ?? "Event",
    description: event?.description
  };
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) notFound();

  return (
    <PageTransition>
      <article className="bg-surface pt-28">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-royal">{event.type}</p>
            <h1 className="mt-5 font-heading text-5xl leading-tight text-navy sm:text-7xl">{event.title}</h1>
            <p className="mt-5 text-lg leading-8 text-slateText">{event.description}</p>
            <div className="mt-7 grid gap-3 text-sm font-semibold text-slateText">
              <span className="flex items-center gap-2"><CalendarDays className="h-4 w-4 text-royal" /> {formatDate(event.date)}</span>
              <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-royal" /> {event.location}</span>
            </div>
          </div>
          <div className="relative min-h-[420px] overflow-hidden rounded-[8px] shadow-institutional">
            <Image src={event.coverImage} alt={event.title} fill priority className="object-cover" />
          </div>
        </div>
        <Section eyebrow="Event Gallery" title="Moments from the gathering.">
          <div className="grid gap-4 md:grid-cols-3">
            {[event.coverImage, ...event.gallery].map((image, index) => (
              <div key={image} className="relative aspect-[4/3] overflow-hidden rounded-[8px]">
                <Image
                  src={image}
                  alt={`${event.title} gallery image ${index + 1}`}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          <div className="mx-auto max-w-3xl">
            <Comments entityId={event.id} entityType="event" />
          </div>
        </Section>
      </article>
    </PageTransition>
  );
}
