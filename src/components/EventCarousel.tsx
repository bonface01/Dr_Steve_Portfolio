"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import type { EventItem } from "@/lib/types";
import { EventCard } from "./EventCard";

export function EventCarousel({ events }: { events: EventItem[] }) {
  const [index, setIndex] = useState(0);
  const active = events[index] ?? events[0];

  if (!active) return null;

  return (
    <div>
      <EventCard event={active} />
      <div className="mt-5 flex items-center justify-between">
        <div className="text-sm text-white/55">
          {String(index + 1).padStart(2, "0")} / {String(events.length).padStart(2, "0")}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Previous event"
            onClick={() => setIndex((value) => (value === 0 ? events.length - 1 : value - 1))}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/16 text-white transition hover:bg-white/10"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next event"
            onClick={() => setIndex((value) => (value + 1) % events.length)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/16 text-white transition hover:bg-white/10"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
