import { ContactForm } from "@/components/ContactForm";
import { PageTransition } from "@/components/Reveal";
import { Section } from "@/components/Section";

export const metadata = {
  title: "Consultation Request",
  description: "Request consultation, mentorship, student guidance, or PDC engagement with Steve Muthusi, PhD."
};

export default function ContactPage() {
  return (
    <PageTransition>
      <Section
        dark
        className="pt-36"
        eyebrow="Consultation"
        title="Inquiry, mentorship, and academic consultation."
        intro="Dr. Steve Muthusi provides mentorship, coaching, and developmental guidance focused on personal growth, leadership transformation, and human potential development."
      >
        <ContactForm />
      </Section>
    </PageTransition>
  );
}
