import { cn } from "@/lib/utils";

export function Section({
  children,
  eyebrow,
  title,
  intro,
  className,
  dark = false
}: {
  children: React.ReactNode;
  eyebrow?: string;
  title?: string;
  intro?: string;
  className?: string;
  dark?: boolean;
}) {
  return (
    <section className={cn("px-4 py-20 sm:px-6 lg:px-8", dark && "bg-royal text-white", className)}>
      <div className="mx-auto max-w-7xl">
        {(eyebrow || title || intro) && (
          <div className="mb-10 max-w-3xl">
            {eyebrow ? (
              <p className={cn("mb-3 text-xs font-bold uppercase tracking-[0.28em]", dark ? "text-white" : "text-royal")}>
                {eyebrow}
              </p>
            ) : null}
            {title ? (
              <h2 className="font-heading text-4xl leading-tight sm:text-5xl">{title}</h2>
            ) : null}
            {intro ? (
              <p className={cn("mt-4 text-lg leading-8", dark ? "text-white/72" : "text-slateText")}>{intro}</p>
            ) : null}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
