import { redirect } from "next/navigation";
import { blogPosts } from "@/lib/content";
import { getBlogPostBySlug } from "@/lib/data";

export const revalidate = 60;

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  return {
    title: post?.title ?? "Commentary",
    description: post?.excerpt
  };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  redirect(`/commentaries/${slug}`);
}
