"use client";

import { Heart, Share2 } from "lucide-react";
import { useEffect, useState } from "react";

export function LikeShare({ id, initialLikes }: { id: string; initialLikes: number }) {
  const [likes, setLikes] = useState(initialLikes);
  const storageKey = `likes:${id}`;

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (saved) setLikes(Number(saved));
  }, [storageKey]);

  function like() {
    const next = likes + 1;
    setLikes(next);
    window.localStorage.setItem(storageKey, String(next));
  }

  async function share() {
    if (navigator.share) {
      await navigator.share({ title: document.title, url: window.location.href });
    } else {
      await navigator.clipboard.writeText(window.location.href);
    }
  }

  return (
    <div className="flex flex-wrap gap-3">
      <button
        type="button"
        onClick={like}
        className="inline-flex min-h-11 items-center gap-2 rounded-full border border-navy/10 bg-white px-4 text-sm font-bold text-navy transition hover:-translate-y-0.5"
      >
        <Heart className="h-4 w-4 text-royal" /> {likes} likes
      </button>
      <button
        type="button"
        onClick={share}
        className="inline-flex min-h-11 items-center gap-2 rounded-full border border-navy/10 bg-white px-4 text-sm font-bold text-navy transition hover:-translate-y-0.5"
      >
        <Share2 className="h-4 w-4 text-royal" /> Share
      </button>
    </div>
  );
}
