import type { MetadataRoute } from "next";
import { blogPosts, events } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://dr-steve-portfolio.vercel.app";
  const now = new Date();

  const staticRoutes = [
    "",
    "/about",
    "/academic",
    "/leadership",
    "/blog",
    "/events",
    "/gallery",
    "/testimonials",
    "/contact"
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8
  }));

  const blogRoutes = blogPosts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7
  }));

  const eventRoutes = events.map((event) => ({
    url: `${siteUrl}/events/${event.slug}`,
    lastModified: new Date(event.date),
    changeFrequency: "monthly" as const,
    priority: 0.6
  }));

  return [...staticRoutes, ...blogRoutes, ...eventRoutes];
}
