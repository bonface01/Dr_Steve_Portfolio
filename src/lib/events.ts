import type { EventItem } from "./types";

export function isUpcomingEvent(event: EventItem, now = new Date()) {
  const eventDate = new Date(event.date);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const normalizedEventDate = new Date(
    eventDate.getFullYear(),
    eventDate.getMonth(),
    eventDate.getDate()
  );

  return normalizedEventDate >= today;
}

export function splitEventsByDate(events: EventItem[], now = new Date()) {
  const upcoming = events
    .filter((event) => isUpcomingEvent(event, now))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const past = events
    .filter((event) => !isUpcomingEvent(event, now))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return { upcoming, past };
}
