import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { BlogPost } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group overflow-hidden rounded-[8px] border border-navy/10 bg-white shadow-institutional transition duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <div className="mb-4 flex items-center justify-between gap-4 text-xs font-bold uppercase tracking-[0.2em] text-royal">
          <span>{post.category}</span>
          <span>{formatDate(post.publishedAt)}</span>
        </div>
        <h3 className="font-heading text-2xl leading-tight text-navy">{post.title}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slateText">{post.excerpt}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-navy">
          Read insight <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
