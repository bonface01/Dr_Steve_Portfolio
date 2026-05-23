import { BlogCard } from "@/components/BlogCard";
import { PageTransition, Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { getBlogPosts } from "@/lib/data";

const topics = [
  "Mental wellness",
  "Leadership psychology",
  "Human behavior",
  "Youth empowerment",
  "Emotional intelligence",
  "Education and growth",
  "Cognitive development"
];

export const metadata = {
  title: "Psychological Insights & Commentary",
  description:
    "Reflective psychology, leadership, education, and human development commentaries by Steve Muthusi, PhD."
};

export const revalidate = 60;

export default async function CommentariesPage() {
  const posts = await getBlogPosts();

  return (
    <PageTransition>
      <Section
        className="bg-surface bg-academic-wash pt-36"
        eyebrow="Psychological Insights"
        title="Psychological Insights & Commentary"
        intro="A reflective, educational, and professional space for thought leadership on wellness, behavior, education, and growth."
      >
        <div className="mb-8 flex flex-wrap gap-2">
          {topics.map((topic) => (
            <span
              key={topic}
              className="rounded-full border border-royal/15 bg-white px-4 py-2 text-sm font-bold text-royal"
            >
              {topic}
            </span>
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((post, index) => (
            <Reveal key={post.id} delay={index * 0.06}>
              <BlogCard post={post} hrefPrefix="/commentaries" />
            </Reveal>
          ))}
        </div>
      </Section>
    </PageTransition>
  );
}
