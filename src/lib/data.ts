import { blogPosts, events, galleryItems, testimonials } from "./content";
import { getAdminDb } from "./firebaseAdmin";
import type { BlogPost, EventItem, GalleryItem, Testimonial } from "./types";

export const CMS_REVALIDATE_SECONDS = 60;

async function getCollection<T extends { id: string }>(
  collectionName: string,
  fallback: T[]
) {
  const db = getAdminDb();
  if (!db) return fallback;

  try {
    const snapshot = await db.collection(collectionName).get();
    if (snapshot.empty) return fallback;
    return snapshot.docs.map((doc) => doc.data() as T);
  } catch (error) {
    console.warn(`Falling back to seeded ${collectionName} content`, error);
    return fallback;
  }
}

export async function getBlogPosts() {
  const posts = await getCollection<BlogPost>("blogPosts", blogPosts);
  return posts.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export async function getBlogPostBySlug(slug: string) {
  const posts = await getBlogPosts();
  return posts.find((post) => post.slug === slug);
}

export async function getEvents() {
  const items = await getCollection<EventItem>("events", events);
  return items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getEventBySlug(slug: string) {
  const items = await getEvents();
  return items.find((event) => event.slug === slug);
}

export async function getGalleryItems() {
  return getCollection<GalleryItem>("galleryItems", galleryItems);
}

export async function getTestimonials() {
  return getCollection<Testimonial>("testimonials", testimonials);
}
