import { Quote } from "lucide-react";
import { PageTransition, Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { getTestimonials } from "@/lib/data";

export const metadata = {
  title: "Testimonials",
  description: "Student, colleague, and PDC participant testimonials."
};

export const revalidate = 60;

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <PageTransition>
      <Section
        className="bg-surface bg-academic-wash pt-36"
        eyebrow="Testimonials"
        title="Voices from students, colleagues, and leadership participants."
      >
        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.id} delay={index * 0.08}>
              <figure className="h-full rounded-[8px] border border-navy/10 bg-white p-7 shadow-institutional">
                <Quote className="h-8 w-8 text-royal" />
                <blockquote className="mt-6 text-lg leading-8 text-navy">"{testimonial.quote}"</blockquote>
                <figcaption className="mt-6 text-sm text-slateText">
                  <strong className="block text-navy">{testimonial.name}</strong>
                  {testimonial.role} - {testimonial.type}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Section>
    </PageTransition>
  );
}
