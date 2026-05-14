import { BlogCard } from "@/components/BlogCard";
import { PageTransition, Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { blogPosts } from "@/lib/content";

const categories = ["Psychology", "Leadership", "Education", "Wellness"];

export const metadata = {
  title: "Blog",
  description: "Psychology, leadership, education, and wellness insights by Steve Muthusi, PhD."
};

export default function BlogPage() {
  return (
    <PageTransition>
      <Section
        className="bg-surface bg-academic-wash pt-36"
        eyebrow="Blog"
        title="Psychology-informed insight for leadership, wellness, and learning."
        intro="A CMS-ready writing system with categories, featured images, comments, likes, sharing, and related posts."
      >
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((category) => (
            <span key={category} className="rounded-full border border-navy/10 bg-white px-4 py-2 text-sm font-bold text-navy">
              {category}
            </span>
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {blogPosts.map((post, index) => (
            <Reveal key={post.id} delay={index * 0.06}>
              <BlogCard post={post} />
            </Reveal>
          ))}
        </div>
      </Section>
    </PageTransition>
  );
}
