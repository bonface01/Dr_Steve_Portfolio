"use client";

import { MaybeImage } from "@/components/MaybeImage";
import { X } from "lucide-react";
import { useMemo, useState } from "react";
import type { GalleryItem } from "@/lib/types";
import { cn } from "@/lib/utils";

const filters = ["All", "Events", "Lectures", "Workshops", "Community"] as const;

export function GalleryMasonry({ items }: { items: GalleryItem[] }) {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [active, setActive] = useState<GalleryItem | null>(null);

  const filtered = useMemo(
    () => (filter === "All" ? items : items.filter((item) => item.category === filter)),
    [filter, items]
  );

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2">
        {filters.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setFilter(item)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-bold transition",
              filter === item
                ? "border-navy bg-royal text-white"
                : "border-navy/10 bg-white/70 text-navy hover:bg-white"
            )}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="masonry">
        {filtered.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActive(item)}
            className="masonry-item group w-full overflow-hidden rounded-[8px] bg-white text-left shadow-institutional"
          >
            <div className={cn("relative overflow-hidden", index % 3 === 0 ? "aspect-[4/5]" : "aspect-[5/4]")}>
              <MaybeImage
                src={item.image}
                alt={item.title}
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-royal">{item.category}</p>
              <h3 className="mt-2 font-heading text-2xl text-navy">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slateText">{item.description}</p>
            </div>
          </button>
        ))}
      </div>

      {active ? (
        <div className="fixed inset-0 z-[80] grid place-items-center bg-royal/88 p-4 backdrop-blur">
          <button
            type="button"
            aria-label="Close image"
            onClick={() => setActive(null)}
            className="absolute right-5 top-5 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-navy"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="w-full max-w-5xl overflow-hidden rounded-[8px] bg-white">
            <div className="relative aspect-[16/10]">
              <MaybeImage src={active.image} alt={active.title} fill className="object-cover" />
            </div>
            <div className="p-5">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-royal">{active.category}</p>
              <h3 className="mt-2 font-heading text-3xl text-navy">{active.title}</h3>
              <p className="mt-2 text-slateText">{active.description}</p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
