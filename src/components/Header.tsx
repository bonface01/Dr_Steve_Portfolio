"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { primaryNav } from "@/lib/brand";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 py-4 sm:px-6">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-royal/10 bg-white/95 px-5 py-3 text-navy shadow-2xl shadow-royal/10 backdrop-blur-2xl">
        <Link href="/" className="font-heading text-xl">
          Steve Muthusi
        </Link>
        <div className="hidden items-center gap-1 lg:flex">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-3 py-2 text-sm text-slateText transition hover:bg-royal/8 hover:text-royal",
                (pathname === item.href ||
                  (item.href === "/commentaries" && pathname.startsWith("/blog")) ||
                  (item.href === "/academia" && pathname.startsWith("/academic")) ||
                  (item.href === "/consultation" && pathname.startsWith("/leadership"))) &&
                  "bg-royal/10 text-royal"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <button
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-royal/15 text-royal lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>
      {open ? (
        <div className="mx-auto mt-3 max-w-7xl rounded-3xl border border-royal/10 bg-white/98 p-4 text-navy shadow-2xl backdrop-blur-2xl lg:hidden">
          <div className="grid gap-1">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm text-slateText hover:bg-royal/8 hover:text-royal"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
