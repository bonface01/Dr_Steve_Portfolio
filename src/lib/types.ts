export type Category = "Psychology" | "Leadership" | "Education" | "Wellness";

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: Category;
  coverImage: string;
  content: string;
  author: string;
  publishedAt: string;
  likes: number;
  featured?: boolean;
};

export type EventType =
  | "Conferences"
  | "Workshops"
  | "Lectures"
  | "PDC events"
  | "University activities";

export type EventItem = {
  id: string;
  slug: string;
  title: string;
  date: string;
  type: EventType;
  description: string;
  coverImage: string;
  gallery: string[];
  location: string;
  featured?: boolean;
};

export type GalleryItem = {
  id: string;
  title: string;
  category: "Events" | "Lectures" | "Workshops" | "Community";
  image: string;
  description: string;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  type: "Student" | "Colleague" | "Video";
  quote: string;
  videoUrl?: string;
};

export type Comment = {
  id: string;
  entityType: "blog" | "event";
  entityId: string;
  name: string;
  message: string;
  status: "pending" | "approved";
  createdAt: string;
};
