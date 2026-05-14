import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  icon?: LucideIcon;
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  icon: Icon,
  className
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition duration-300 focus:outline-none focus:ring-2 focus:ring-royal focus:ring-offset-2",
        variant === "primary" &&
          "bg-royal text-white shadow-lg shadow-royal/20 hover:-translate-y-0.5 hover:bg-institutional",
        variant === "secondary" &&
          "border border-white/25 bg-white/10 text-white hover:-translate-y-0.5 hover:bg-white/18",
        variant === "ghost" &&
          "border border-royal/20 bg-white text-royal hover:-translate-y-0.5 hover:bg-surface",
        className
      )}
    >
      {Icon ? <Icon aria-hidden className="h-4 w-4" /> : null}
      {children}
    </Link>
  );
}
