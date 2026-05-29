/**
 * Admin API Service
 * Handles all admin operations through secured API routes
 * Provides client-side interface for AdminDashboard component
 */

import { BlogPost, EventItem, GalleryItem } from "@/lib/types";

export interface AdminApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  errors?: Array<{ field: string; message: string }>;
  timestamp: string;
}

/**
 * Get authorization header with ID token
 * Assumes user is already authenticated via Firebase Auth
 */
async function getAuthHeader(): Promise<{ Authorization: string } | null> {
  try {
    // This will be called from client-side, so we use Firebase Auth
    // In a real implementation, you'd call firebase.auth().currentUser?.getIdToken()
    // For now, return null and rely on middleware/cookies
    return null;
  } catch (error) {
    console.error("Failed to get auth token:", error);
    return null;
  }
}

/**
 * Make API request with proper error handling
 */
async function apiRequest<T = any>(
  endpoint: string,
  method: "GET" | "POST" | "PATCH" | "DELETE",
  body?: any
): Promise<AdminApiResponse<T>> {
  const authHeader = await getAuthHeader();

  const response = await fetch(endpoint, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(authHeader && authHeader)
    },
    body: body ? JSON.stringify(body) : undefined
  });

  const data = await response.json();

  if (!response.ok) {
    return {
      success: false,
      error: data.error || `HTTP ${response.status}`,
      errors: data.errors,
      timestamp: data.timestamp || new Date().toISOString()
    };
  }

  return {
    success: true,
    data: data.data,
    timestamp: data.timestamp || new Date().toISOString()
  };
}

// Blog Posts

export async function fetchBlogPosts(): Promise<AdminApiResponse<BlogPost[]>> {
  return apiRequest("/api/admin/content/blogPosts", "GET");
}

export async function fetchBlogPost(id: string): Promise<AdminApiResponse<BlogPost>> {
  return apiRequest(`/api/admin/content/blogPosts/${id}`, "GET");
}

export async function createBlogPost(data: Partial<BlogPost>): Promise<AdminApiResponse<BlogPost>> {
  return apiRequest("/api/admin/content/blogPosts", "POST", data);
}

export async function updateBlogPost(
  id: string,
  data: Partial<BlogPost>
): Promise<AdminApiResponse<BlogPost>> {
  return apiRequest(`/api/admin/content/blogPosts/${id}`, "PATCH", data);
}

export async function deleteBlogPost(id: string): Promise<AdminApiResponse<{ deleted: boolean }>> {
  return apiRequest(`/api/admin/content/blogPosts/${id}`, "DELETE");
}

// Events

export async function fetchEvents(): Promise<AdminApiResponse<EventItem[]>> {
  return apiRequest("/api/admin/content/events", "GET");
}

export async function fetchEvent(id: string): Promise<AdminApiResponse<EventItem>> {
  return apiRequest(`/api/admin/content/events/${id}`, "GET");
}

export async function createEvent(data: Partial<EventItem>): Promise<AdminApiResponse<EventItem>> {
  return apiRequest("/api/admin/content/events", "POST", data);
}

export async function updateEvent(
  id: string,
  data: Partial<EventItem>
): Promise<AdminApiResponse<EventItem>> {
  return apiRequest(`/api/admin/content/events/${id}`, "PATCH", data);
}

export async function deleteEvent(id: string): Promise<AdminApiResponse<{ deleted: boolean }>> {
  return apiRequest(`/api/admin/content/events/${id}`, "DELETE");
}

// Gallery Items

export async function fetchGalleryItems(): Promise<AdminApiResponse<GalleryItem[]>> {
  return apiRequest("/api/admin/content/galleryItems", "GET");
}

export async function fetchGalleryItem(id: string): Promise<AdminApiResponse<GalleryItem>> {
  return apiRequest(`/api/admin/content/galleryItems/${id}`, "GET");
}

export async function createGalleryItem(
  data: Partial<GalleryItem>
): Promise<AdminApiResponse<GalleryItem>> {
  return apiRequest("/api/admin/content/galleryItems", "POST", data);
}

export async function updateGalleryItem(
  id: string,
  data: Partial<GalleryItem>
): Promise<AdminApiResponse<GalleryItem>> {
  return apiRequest(`/api/admin/content/galleryItems/${id}`, "PATCH", data);
}

export async function deleteGalleryItem(id: string): Promise<AdminApiResponse<{ deleted: boolean }>> {
  return apiRequest(`/api/admin/content/galleryItems/${id}`, "DELETE");
}

// Comments

export async function fetchPendingComments() {
  return apiRequest("/api/admin/comments?status=pending", "GET");
}

export async function approveComment(
  id: string,
  notes?: string
): Promise<AdminApiResponse<{ moderatedAt: string }>> {
  return apiRequest(`/api/admin/comments/${id}`, "PATCH", {
    status: "approved",
    notes
  });
}

export async function rejectComment(
  id: string,
  notes?: string
): Promise<AdminApiResponse<{ moderatedAt: string }>> {
  return apiRequest(`/api/admin/comments/${id}`, "PATCH", {
    status: "rejected",
    notes
  });
}

export async function deleteComment(id: string): Promise<AdminApiResponse<{ deleted: boolean }>> {
  return apiRequest(`/api/admin/comments/${id}`, "DELETE");
}
