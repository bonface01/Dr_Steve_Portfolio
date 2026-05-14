import { ContactForm } from "@/components/ContactForm";
import { PageTransition } from "@/components/Reveal";
import { Section } from "@/components/Section";

export const metadata = {
  title: "Contact",
  description: "Contact Steve Muthusi, PhD, request consultation, or connect with PDC."
};

export default function ContactPage() {
  return (
    <PageTransition>
      <Section
        dark
        className="pt-36"
        eyebrow="Contact"
        title="Start a thoughtful conversation."
        intro="Use the form for consultation requests, speaking invitations, student mentorship, PDC programs, or academic collaboration."
      >
        <ContactForm />
      </Section>
    </PageTransition>
  );
}
