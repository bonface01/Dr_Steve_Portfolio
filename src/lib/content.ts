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
    image: "/dr_steve/hero-speaking.jpg"
  },
  {
    title: "Leadership Formation",
    text: "Mentorship and programs that help emerging leaders turn clarity, discipline, and service into impact.",
    image: "/dr_steve/hero-stage.jpg"
  },
  {
    title: "Academic Excellence",
    text: "Teaching, research, and scholarly contribution anchored in the University of Nairobi community.",
    image: "/dr_steve/hero-stage.jpg"
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
    coverImage: "/dr_steve/hero-speaking.jpg",
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
    coverImage: "/dr_steve/hero-stage.jpg",
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
    coverImage: "/dr_steve/hero-audience.jpg",
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
    coverImage: "/dr_steve/hero-stage.jpg",
    gallery: [
      "/dr_steve/hero-speaking.jpg",
      "/dr_steve/hero-audience.jpg"
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
    coverImage: "/dr_steve/hero-stage.jpg",
    gallery: [
      "/dr_steve/hero-audience.jpg",
      "/dr_steve/hero-audience.jpg"
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
    coverImage: "/dr_steve/hero-audience.jpg",
    gallery: [
      "/dr_steve/hero-stage.jpg"
    ],
    location: "Nairobi, Kenya"
  }
];

export const galleryItems: GalleryItem[] = [
  {
    id: "gallery-001",
    title: "Leadership cohort dialogue",
    category: "Events",
    image: "/dr_steve/hero-audience.jpg",
    description: "PDC leaders discussing service, identity, and personal excellence."
  },
  {
    id: "gallery-002",
    title: "University lecture session",
    category: "Lectures",
    image: "/dr_steve/hero-stage.jpg",
    description: "Academic teaching and student engagement in psychology."
  },
  {
    id: "gallery-003",
    title: "Mentorship workshop",
    category: "Workshops",
    image: "/dr_steve/hero-audience.jpg",
    description: "Interactive leadership exercises and reflective practice."
  },
  {
    id: "gallery-004",
    title: "Community leadership circle",
    category: "Community",
    image: "/dr_steve/hero-stage.jpg",
    description: "A community-centered conversation on responsibility and growth."
  },
  {
    id: "gallery-005",
    title: "Wellness conversation",
    category: "Events",
    image: "/dr_steve/hero-stage.jpg",
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
