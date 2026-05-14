import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import type { EventItem } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export function EventCard({ event }: { event: EventItem }) {
  return (
    <Link
      href={`/events/${event.slug}`}
      className="group grid overflow-hidden rounded-[8px] border border-white/14 bg-white/8 text-white backdrop-blur transition hover:-translate-y-1 md:grid-cols-[0.9fr_1.1fr]"
    >
      <div className="relative min-h-72 overflow-hidden">
        <Image
          src={event.coverImage}
          alt={event.title}
          fill
          sizes="(min-width: 768px) 40vw, 100vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
      </div>
      <div className="p-7">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-white">{event.type}</p>
        <h3 className="mt-4 font-heading text-3xl leading-tight">{event.title}</h3>
        <p className="mt-4 text-sm leading-7 text-white/72">{event.description}</p>
        <div className="mt-6 grid gap-3 text-sm text-white/70">
          <span className="flex items-center gap-2"><CalendarDays className="h-4 w-4 text-white" /> {formatDate(event.date)}</span>
          <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-white" /> {event.location}</span>
        </div>
      </div>
    </Link>
  );
}
