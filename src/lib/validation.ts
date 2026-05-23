/**
 * Input validation and sanitization utilities.
 * Centralized schemas for all API requests.
 */

export interface ValidationError {
  field: string;
  message: string;
}

export class ValidationSchema {
  private errors: ValidationError[] = [];

  addError(field: string, message: string): this {
    this.errors.push({ field, message });
    return this;
  }

  isValid(): boolean {
    return this.errors.length === 0;
  }

  getErrors(): ValidationError[] {
    return this.errors;
  }

  throw(): never {
    throw new Error(JSON.stringify(this.errors));
  }
}

// Blog Post Validation
export function validateBlogPostInput(data: unknown): {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  coverImage: string;
  content: string;
  author: string;
  publishedAt: string;
  featured: boolean;
} {
  const schema = new ValidationSchema();
  const obj = data as Record<string, any>;

  const id = String(obj.id || "").trim();
  const slug = String(obj.slug || "").trim();
  const title = String(obj.title || "").trim();
  const excerpt = String(obj.excerpt || "").trim();
  const category = String(obj.category || "").trim();
  const coverImage = String(obj.coverImage || "").trim();
  const content = String(obj.content || "").trim();
  const author = String(obj.author || "").trim();
  const publishedAt = String(obj.publishedAt || "").trim();
  const featured = Boolean(obj.featured);

  if (!title || title.length < 3) schema.addError("title", "Title must be at least 3 characters");
  if (!excerpt || excerpt.length < 10) schema.addError("excerpt", "Excerpt must be at least 10 characters");
  if (!content || content.length < 20) schema.addError("content", "Content must be at least 20 characters");
  if (!category) schema.addError("category", "Category is required");
  if (!coverImage) schema.addError("coverImage", "Cover image is required");
  if (!author) schema.addError("author", "Author is required");
  if (!publishedAt) schema.addError("publishedAt", "Publish date is required");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(publishedAt)) schema.addError("publishedAt", "Invalid date format");

  if (!schema.isValid()) schema.throw();

  return {
    id: id || `post-${Date.now()}`,
    slug: slug || makeSlug(title),
    title,
    excerpt,
    category,
    coverImage,
    content,
    author,
    publishedAt,
    featured
  };
}

// Event Validation
export function validateEventInput(data: unknown): {
  id: string;
  slug: string;
  title: string;
  date: string;
  type: string;
  description: string;
  coverImage: string;
  gallery: string[];
  location: string;
  featured: boolean;
} {
  const schema = new ValidationSchema();
  const obj = data as Record<string, any>;

  const id = String(obj.id || "").trim();
  const slug = String(obj.slug || "").trim();
  const title = String(obj.title || "").trim();
  const date = String(obj.date || "").trim();
  const type = String(obj.type || "").trim();
  const description = String(obj.description || "").trim();
  const coverImage = String(obj.coverImage || "").trim();
  const gallery = Array.isArray(obj.gallery) ? obj.gallery.map(String) : [];
  const location = String(obj.location || "").trim();
  const featured = Boolean(obj.featured);

  if (!title || title.length < 3) schema.addError("title", "Title must be at least 3 characters");
  if (!description || description.length < 10) schema.addError("description", "Description must be at least 10 characters");
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) schema.addError("date", "Invalid date format (YYYY-MM-DD)");
  if (!type) schema.addError("type", "Event type is required");
  if (!coverImage) schema.addError("coverImage", "Cover image is required");
  if (!location) schema.addError("location", "Location is required");

  if (!schema.isValid()) schema.throw();

  return {
    id: id || `event-${Date.now()}`,
    slug: slug || makeSlug(title),
    title,
    date,
    type,
    description,
    coverImage,
    gallery: gallery.filter((url) => url && typeof url === "string"),
    location,
    featured
  };
}

// Gallery Item Validation
export function validateGalleryInput(data: unknown): {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
} {
  const schema = new ValidationSchema();
  const obj = data as Record<string, any>;

  const id = String(obj.id || "").trim();
  const title = String(obj.title || "").trim();
  const category = String(obj.category || "").trim();
  const image = String(obj.image || "").trim();
  const description = String(obj.description || "").trim();

  if (!title || title.length < 3) schema.addError("title", "Title must be at least 3 characters");
  if (!category) schema.addError("category", "Category is required");
  if (!image) schema.addError("image", "Image is required");
  if (!description || description.length < 5) schema.addError("description", "Description must be at least 5 characters");

  if (!schema.isValid()) schema.throw();

  return {
    id: id || `gallery-${Date.now()}`,
    title,
    category,
    image,
    description
  };
}

// Comment Validation
export function validateCommentInput(data: unknown): {
  id: string;
  entityType: "blog" | "event";
  entityId: string;
  name: string;
  message: string;
  status: "pending" | "approved";
  createdAt: string;
} {
  const schema = new ValidationSchema();
  const obj = data as Record<string, any>;

  const name = String(obj.name || "").trim();
  const message = String(obj.message || "").trim();
  const entityType = String(obj.entityType || "").trim();
  const entityId = String(obj.entityId || "").trim();

  if (!name || name.length < 2) schema.addError("name", "Name must be at least 2 characters");
  if (!message || message.length < 5) schema.addError("message", "Comment must be at least 5 characters");
  if (message.length > 2000) schema.addError("message", "Comment must be less than 2000 characters");
  if (!entityType || !["blog", "event"].includes(entityType)) schema.addError("entityType", "Invalid entity type");
  if (!entityId) schema.addError("entityId", "Entity ID is required");

  if (!schema.isValid()) schema.throw();

  return {
    id: `comment-${Date.now()}`,
    entityType: entityType as "blog" | "event",
    entityId,
    name,
    message,
    status: "pending",
    createdAt: new Date().toISOString()
  };
}

// Contact Submission Validation
export function validateContactInput(data: unknown): {
  name: string;
  email: string;
  phone: string;
  type: string;
  message: string;
  createdAt: string;
  status: "new" | "reviewed" | "archived";
} {
  const schema = new ValidationSchema();
  const obj = data as Record<string, any>;

  const name = String(obj.name || "").trim();
  const email = String(obj.email || "").trim();
  const phone = String(obj.phone || "").trim();
  const type = String(obj.type || "").trim();
  const message = String(obj.message || "").trim();

  if (!name || name.length < 2) schema.addError("name", "Name must be at least 2 characters");
  if (!email || !isValidEmail(email)) schema.addError("email", "Valid email is required");
  if (!message || message.length < 10) schema.addError("message", "Message must be at least 10 characters");
  if (message.length > 5000) schema.addError("message", "Message must be less than 5000 characters");
  if (!type) schema.addError("type", "Inquiry type is required");

  if (!schema.isValid()) schema.throw();

  return {
    name,
    email,
    phone,
    type,
    message,
    createdAt: new Date().toISOString(),
    status: "new"
  };
}

// Helper functions
function makeSlug(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

export function sanitizeHtml(html: string): string {
  // Basic XSS prevention: remove script tags and event handlers
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, "")
    .replace(/on\w+\s*=\s*[^\s>]*/gi, "");
}
