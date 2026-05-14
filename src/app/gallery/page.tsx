import { GalleryMasonry } from "@/components/GalleryMasonry";
import { PageTransition } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { galleryItems } from "@/lib/content";

export const metadata = {
  title: "Gallery",
  description: "Masonry gallery for events, lectures, workshops, and community engagement."
};

export default function GalleryPage() {
  return (
    <PageTransition>
      <Section
        className="bg-surface bg-academic-wash pt-36"
        eyebrow="Gallery"
        title="A visual archive of teaching, mentorship, and public leadership."
        intro="Filterable masonry gallery with image zoom and lightbox viewing."
      >
        <GalleryMasonry items={galleryItems} />
      </Section>
    </PageTransition>
  );
}
