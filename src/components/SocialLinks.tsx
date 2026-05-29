import Link from "next/link";
import { Facebook, Instagram, Music2, Youtube } from "lucide-react";
import { socialLinks } from "@/lib/brand";
import { cn } from "@/lib/utils";

const icons = {
  Facebook,
  TikTok: Music2,
  YouTube: Youtube,
  Instagram
};

export function SocialLinks({
  className,
  tone = "light",
  showHandle = false
}: {
  className?: string;
  tone?: "light" | "dark";
  showHandle?: boolean;
}) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {socialLinks.map((item) => {
        const Icon = icons[item.platform as keyof typeof icons];

        return (
          <Link
            key={item.platform}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            aria-label={`${item.platform} ${item.handle}`}
            className={cn(
              "inline-flex min-h-10 items-center gap-2 rounded-full border px-3 py-2 text-sm font-semibold transition duration-300",
              tone === "light"
                ? "border-slate-300/30 bg-white/90 text-navy hover:border-royal hover:bg-white"
                : "border-slate-200/35 bg-white text-royal hover:border-royal/60 hover:bg-slate-100"
            )}
          >
            <Icon aria-hidden className="h-4 w-4" />
            {showHandle ? <span>{item.handle}</span> : <span className="sr-only">{item.platform}</span>}
          </Link>
        );
      })}
    </div>
  );
}
