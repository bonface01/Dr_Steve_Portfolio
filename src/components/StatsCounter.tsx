"use client";

import { useEffect, useRef, useState } from "react";

export function StatsCounter({
  value,
  label,
  suffix = "+"
}: {
  value: number;
  label: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const duration = 1200;
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          setCount(Math.round(value * progress));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.35 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="rounded-[8px] border border-navy/10 bg-white/70 p-6">
      <div className="font-heading text-5xl text-navy">
        {count}
        {suffix}
      </div>
      <p className="mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-slateText">{label}</p>
    </div>
  );
}
