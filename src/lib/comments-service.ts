/**
 * Client-side comment service
 * Handles comment submission via API (not direct Firestore access)
 */

import { getDb } from "./firestore";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";

export interface CommentData {
  id: string;
  entityType: "blog" | "event";
  entityId: string;
  name: string;
  message: string;
  status: "pending" | "approved";
  createdAt: string;
}

/**
 * Submit a new comment
 * Sends to API, which validates and writes to Firestore
 */
export async function submitComment(
  entityType: "blog" | "event",
  entityId: string,
  name: string,
  message: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        entityType,
        entityId,
        name,
        message
      })
    });

    if (!response.ok) {
      const data = await response.json();
      return {
        success: false,
        error: data.error || "Failed to submit comment"
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Error submitting comment:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
}

/**
 * Fetch approved comments for an entity
 * Uses client-side Firestore read (with appropriate security rules)
 */
export async function getApprovedComments(
  entityType: "blog" | "event",
  entityId: string
): Promise<CommentData[]> {
  try {
    const db = getDb();
    if (!db) return [];

    const commentsRef = collection(db, "comments");
    const q = query(
      commentsRef,
      where("entityType", "==", entityType),
      where("entityId", "==", entityId),
      where("status", "==", "approved"),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => doc.data() as CommentData);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
}
