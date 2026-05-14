import Image from "next/image";
import { notFound } from "next/navigation";
import { BlogCard } from "@/components/BlogCard";
import { Comments } from "@/components/Comments";
import { LikeShare } from "@/components/LikeShare";
import { PageTransition } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { blogPosts } from "@/lib/content";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export const revalidate = 60;

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  return {
    title: post?.title ?? "Blog Post",
    description: post?.excerpt
  };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [post, posts] = await Promise.all([getBlogPostBySlug(slug), getBlogPosts()]);
  if (!post) notFound();

  const related = posts
    .filter((item) => item.id !== post.id && item.category === post.category)
    .concat(posts.filter((item) => item.id !== post.id && item.category !== post.category))
    .slice(0, 3);

  return (
    <PageTransition>
      <article className="bg-surface pt-28">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-royal">{post.category}</p>
          <h1 className="mt-5 font-heading text-5xl leading-tight text-navy sm:text-7xl">{post.title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slateText">{post.excerpt}</p>
          <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm font-semibold text-slateText">
              {post.author} - {formatDate(post.publishedAt)}
            </p>
            <LikeShare id={post.id} initialLikes={post.likes} />
          </div>
        </div>
        <div className="relative mx-auto aspect-[16/8] max-w-7xl overflow-hidden rounded-[8px]">
          <Image src={post.coverImage} alt={post.title} fill priority className="object-cover" />
        </div>
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          <div
            className="prose prose-lg prose-portfolio max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <Comments entityId={post.id} entityType="blog" />
        </div>
      </article>

      <Section eyebrow="Related Posts" title="Continue reading.">
        <div className="grid gap-6 md:grid-cols-3">
          {related.map((item) => (
            <BlogCard key={item.id} post={item} />
          ))}
        </div>
      </Section>
    </PageTransition>
  );
}
