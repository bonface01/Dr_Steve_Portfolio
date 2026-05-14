import type { BlogPost, Comment, EventItem, GalleryItem, Testimonial } from "./types";

export const profile = {
  name: "Steve Muthusi, PhD",
  role: "Psychologist - Lecturer - Leadership Mentor",
  affiliation: "University of Nairobi, Psychology Department",
  organization: "PDC",
  pdcUrl: "https://pdc.co.ke",
  email: "hello@pdc.co.ke",
  social: {
    linkedIn: "https://www.linkedin.com",
    x: "https://x.com",
    youtube: "https://www.youtube.com"
  }
};

export const featuredAreas = [
  {
    title: "Psychology Practice",
    text: "Evidence-informed insight for human behavior, emotional health, and resilient personal growth.",
    image:
      "https://images.unsplash.com/photo-1573497491208-6b1acb260507?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Leadership Formation",
    text: "Mentorship and programs that help emerging leaders turn clarity, discipline, and service into impact.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Academic Excellence",
    text: "Teaching, research, and scholarly contribution anchored in the University of Nairobi community.",
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80"
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: "post-001",
    slug: "leadership-begins-with-self-awareness",
    title: "Leadership Begins With Self-Awareness",
    excerpt:
      "A psychology-informed view of leadership that starts with attention, reflection, and personal responsibility.",
    category: "Leadership",
    coverImage:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1400&q=80",
    author: "Steve Muthusi, PhD",
    publishedAt: "2026-02-12",
    likes: 48,
    featured: true,
    content:
      "<p>Leadership is often described through outcomes: influence, direction, performance, and public courage. Yet the inner life of a leader is where the work begins. Self-awareness gives leadership its ethical center because it asks a person to notice motives, fears, assumptions, and patterns before they become decisions.</p><p>In psychology, growth is rarely accidental. It is cultivated through feedback, reflection, and disciplined practice. Leaders who understand themselves are better able to listen, regulate emotion, repair trust, and create environments where others can flourish.</p><p>PDC programs emphasize this inner architecture of leadership: identity, values, emotional maturity, and service. The result is not charisma for its own sake, but grounded influence that can carry responsibility with dignity.</p>"
  },
  {
    id: "post-002",
    slug: "mental-wellness-in-high-performance-environments",
    title: "Mental Wellness in High Performance Environments",
    excerpt:
      "Why excellence must be built with rest, reflection, and psychologically safe communities.",
    category: "Wellness",
    coverImage:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1400&q=80",
    author: "Steve Muthusi, PhD",
    publishedAt: "2026-01-24",
    likes: 36,
    content:
      "<p>High performance settings can reward speed while quietly neglecting restoration. Over time, this imbalance can reduce creativity, empathy, and judgement. Wellness is not the absence of pressure; it is the presence of habits and relationships that help people carry pressure wisely.</p><p>Healthy environments normalize help-seeking, clarify expectations, and treat rest as part of the performance system. When leaders model psychological steadiness, teams gain permission to pursue excellence without sacrificing humanity.</p>"
  },
  {
    id: "post-003",
    slug: "teaching-psychology-with-cultural-intelligence",
    title: "Teaching Psychology With Cultural Intelligence",
    excerpt:
      "A reflective approach to teaching psychology in classrooms shaped by community, context, and lived experience.",
    category: "Education",
    coverImage:
      "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1400&q=80",
    author: "Steve Muthusi, PhD",
    publishedAt: "2025-11-08",
    likes: 29,
    featured: true,
    content:
      "<p>Psychology becomes most alive when students can connect theory to lived experience. Cultural intelligence in the classroom means respecting context, language, family systems, community identity, and the complex realities that shape behavior.</p><p>An academically rigorous psychology education should teach students to think with precision and listen with humility. Both are necessary for research, clinical sensitivity, and leadership in public life.</p>"
  }
];

export const events: EventItem[] = [
  {
    id: "event-001",
    slug: "pdc-leadership-intensive",
    title: "PDC Leadership Intensive",
    date: "2026-06-18",
    type: "PDC events",
    description:
      "A focused leadership formation gathering for professionals, student leaders, and community builders.",
    coverImage:
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=80"
    ],
    location: "Nairobi, Kenya",
    featured: true
  },
  {
    id: "event-002",
    slug: "psychology-public-lecture",
    title: "Psychology Public Lecture",
    date: "2026-04-11",
    type: "Lectures",
    description:
      "A public conversation on emotional resilience, personal meaning, and the psychology of growth.",
    coverImage:
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80"
    ],
    location: "University of Nairobi",
    featured: true
  },
  {
    id: "event-003",
    slug: "student-mentorship-workshop",
    title: "Student Mentorship Workshop",
    date: "2025-10-20",
    type: "Workshops",
    description:
      "A mentorship workshop helping students clarify identity, habits, career direction, and civic responsibility.",
    coverImage:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=900&q=80"
    ],
    location: "Nairobi, Kenya"
  }
];

export const galleryItems: GalleryItem[] = [
  {
    id: "gallery-001",
    title: "Leadership cohort dialogue",
    category: "Events",
    image:
      "https://images.unsplash.com/photo-1515168833906-d2a3b82b1a48?auto=format&fit=crop&w=900&q=80",
    description: "PDC leaders discussing service, identity, and personal excellence."
  },
  {
    id: "gallery-002",
    title: "University lecture session",
    category: "Lectures",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80",
    description: "Academic teaching and student engagement in psychology."
  },
  {
    id: "gallery-003",
    title: "Mentorship workshop",
    category: "Workshops",
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=900&q=80",
    description: "Interactive leadership exercises and reflective practice."
  },
  {
    id: "gallery-004",
    title: "Community leadership circle",
    category: "Community",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80",
    description: "A community-centered conversation on responsibility and growth."
  },
  {
    id: "gallery-005",
    title: "Wellness conversation",
    category: "Events",
    image:
      "https://images.unsplash.com/photo-1551836022-8b2858c9c69b?auto=format&fit=crop&w=900&q=80",
    description: "A reflective session on mental wellness and personal meaning."
  }
];

export const testimonials: Testimonial[] = [
  {
    id: "testimonial-001",
    name: "A University Student",
    role: "Psychology learner",
    type: "Student",
    quote:
      "Dr. Muthusi teaches psychology with clarity, discipline, and humanity. His classes invite students to think deeply and become more responsible people."
  },
  {
    id: "testimonial-002",
    name: "Academic Colleague",
    role: "University educator",
    type: "Colleague",
    quote:
      "Steve brings rare balance: rigorous scholarship, calm leadership, and a gift for mentoring people toward mature influence."
  },
  {
    id: "testimonial-003",
    name: "PDC Participant",
    role: "Leadership program alumnus",
    type: "Student",
    quote:
      "The PDC experience gave me language for my purpose and practical habits for serving others with confidence."
  }
];

export const comments: Comment[] = [
  {
    id: "comment-001",
    entityType: "blog",
    entityId: "post-001",
    name: "Grace",
    message: "This connects leadership to inner work in a very practical way.",
    status: "approved",
    createdAt: "2026-02-14T10:00:00.000Z"
  },
  {
    id: "comment-002",
    entityType: "event",
    entityId: "event-001",
    name: "Daniel",
    message: "Looking forward to the next cohort and the mentorship sessions.",
    status: "approved",
    createdAt: "2026-03-02T14:00:00.000Z"
  }
];

export const publications = [
  {
    title: "Identity, Meaning, and Leadership Development in Emerging Adults",
    venue: "Working paper",
    year: "2026",
    pdfUrl: "/publications/identity-meaning-leadership.pdf"
  },
  {
    title: "Psychological Resilience and Community-Oriented Mentorship",
    venue: "Lecture manuscript",
    year: "2025",
    pdfUrl: "/publications/resilience-mentorship.pdf"
  }
];
