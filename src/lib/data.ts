import { blogPosts as seededBlogPosts, events as seededEvents, galleryItems as seededGallery, testimonials as seededTestimonials } from "./content";
import { getAdminDb } from "./firebaseAdmin";
import type { BlogPost, EventItem, GalleryItem, Testimonial } from "./types";

export const CMS_REVALIDATE_SECONDS = 60;

/**
 * Fetch collection from Firestore.
 * Falls back to seeded content only in development if Firestore is unavailable.
 * 
 * IMPORTANT: This is server-side only, using Firebase Admin SDK.
 * Firestore is the authoritative source of truth.
 */
async function getCollection<T extends { id: string }>(
  collectionName: string,
  seedFallback: T[]
): Promise<T[]> {
  const db = getAdminDb();
  
  if (!db) {
    console.warn(
      `Firebase Admin not configured. Using seeded ${collectionName} content. ` +
      "Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY to use Firestore."
    );
    return seedFallback;
  }

  try {
    const snapshot = await db.collection(collectionName).get();
    
    if (snapshot.empty) {
      console.info(`Collection ${collectionName} is empty in Firestore. Using seeded content.`);
      return seedFallback;
    }
    
    return snapshot.docs.map((doc) => doc.data() as T);
  } catch (error) {
    console.error(`Error fetching ${collectionName} from Firestore:`, error);
    console.warn(`Falling back to seeded ${collectionName} content`);
    return seedFallback;
  }
}

/**
 * Get all blog posts from Firestore
 * Sorted by publish date (newest first)
 */
export async function getBlogPosts(): Promise<BlogPost[]> {
  const posts = await getCollection<BlogPost>("blogPosts", seededBlogPosts);
  return posts.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

/**
 * Get blog post by slug
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const posts = await getBlogPosts();
  return posts.find((post) => post.slug === slug);
}

/**
 * Get all events from Firestore
 * Sorted by date (newest first)
 */
export async function getEvents(): Promise<EventItem[]> {
  const items = await getCollection<EventItem>("events", seededEvents);
  return items.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/**
 * Get event by slug
 */
export async function getEventBySlug(slug: string): Promise<EventItem | undefined> {
  const items = await getEvents();
  return items.find((event) => event.slug === slug);
}

/**
 * Get all gallery items from Firestore
 */
export async function getGalleryItems(): Promise<GalleryItem[]> {
  return getCollection<GalleryItem>("galleryItems", seededGallery);
}

/**
 * Get gallery items by category
 */
export async function getGalleryItemsByCategory(category: string): Promise<GalleryItem[]> {
  const items = await getGalleryItems();
  return items.filter((item) => item.category === category);
}

/**
 * Get all testimonials from Firestore
 */
export async function getTestimonials(): Promise<Testimonial[]> {
  return getCollection<Testimonial>("testimonials", seededTestimonials);
}

/**
 * Get approved comments for an entity from Firestore
 */
export async function getApprovedComments(
  entityType: "blog" | "event",
  entityId: string
): Promise<any[]> {
  const db = getAdminDb();
  
  if (!db) {
    return [];
  }

  try {
    const snapshot = await db
      .collection("comments")
      .where("entityType", "==", entityType)
      .where("entityId", "==", entityId)
      .where("status", "==", "approved")
      .orderBy("createdAt", "desc")
      .get();

    return snapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
}
