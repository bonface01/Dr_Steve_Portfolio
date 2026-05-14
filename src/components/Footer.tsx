import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { profile } from "@/lib/content";

export function Footer() {
  return (
    <footer className="bg-royal px-4 py-14 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 border-t border-white/10 pt-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <p className="font-heading text-3xl">{profile.name}</p>
          <p className="mt-3 max-w-xl text-white/68">
            Psychologist, lecturer, and leadership mentor advancing reflective practice,
            academic excellence, and purposeful influence through PDC.
          </p>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-white">Connect</p>
          <div className="mt-4 space-y-3 text-sm text-white/70">
            <p className="flex gap-2"><MapPin className="h-4 w-4 text-white" /> University of Nairobi</p>
            <p className="flex gap-2"><Mail className="h-4 w-4 text-white" /> {profile.email}</p>
          </div>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-white">Explore</p>
          <div className="mt-4 grid gap-2 text-sm text-white/70">
            <Link href="/academic" className="hover:text-white">Academic profile</Link>
            <Link href="/leadership" className="hover:text-white">PDC leadership</Link>
            <Link href="/blog" className="hover:text-white">Insights blog</Link>
            <Link href="/contact" className="hover:text-white">Consultation request</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
