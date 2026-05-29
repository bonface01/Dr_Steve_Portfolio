import { MaybeImage } from "@/components/MaybeImage";
import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import type { EventItem } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export function EventCard({
  event,
  status,
  tone = "dark"
}: {
  event: EventItem;
  status?: "Upcoming Event" | "Past Event";
  tone?: "dark" | "light";
}) {
  const isLight = tone === "light";

  return (
    <Link
      href={`/events/${event.slug}`}
      className={`group grid overflow-hidden rounded-[8px] border transition hover:-translate-y-1 md:grid-cols-[0.9fr_1.1fr] ${
        isLight
          ? "border-royal/10 bg-white text-navy shadow-institutional"
          : "border-white/14 bg-white/8 text-white backdrop-blur"
      }`}
    >
      <div className="relative min-h-72 overflow-hidden">
        <MaybeImage
          src={event.coverImage}
          alt={event.title}
          fill
          sizes="(min-width: 768px) 40vw, 100vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
      </div>
      <div className="p-7">
        <div className="flex flex-wrap items-center gap-2">
          {status ? (
            <span
              className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] ${
                isLight ? "bg-royal/10 text-royal" : "bg-white text-royal"
              }`}
            >
              {status}
            </span>
          ) : null}
          <p
            className={`text-xs font-bold uppercase tracking-[0.22em] ${
              isLight ? "text-royal" : "text-white"
            }`}
          >
            {event.type}
          </p>
        </div>
        <h3 className="mt-4 font-heading text-3xl leading-tight">{event.title}</h3>
        <p className={`mt-4 text-sm leading-7 ${isLight ? "text-slateText" : "text-white/72"}`}>
          {event.description}
        </p>
        <div className={`mt-6 grid gap-3 text-sm ${isLight ? "text-slateText" : "text-white/70"}`}>
          <span className="flex items-center gap-2"><CalendarDays className={`h-4 w-4 ${isLight ? "text-royal" : "text-white"}`} /> {formatDate(event.date)}</span>
          <span className="flex items-center gap-2"><MapPin className={`h-4 w-4 ${isLight ? "text-royal" : "text-white"}`} /> {event.location}</span>
        </div>
      </div>
    </Link>
  );
}
