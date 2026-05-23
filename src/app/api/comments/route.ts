import { NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebaseAdmin";
import { validateCommentInput } from "@/lib/validation";
import { apiBadRequest, apiError, apiCreated, apiServiceUnavailable } from "@/lib/api-utils";

/**
 * POST /api/comments
 * Public endpoint for submitting comments
 * Comments are created with "pending" status and require admin approval
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate input
    const validated = validateCommentInput(body);

    const db = getAdminDb();
    if (!db) {
      return apiServiceUnavailable("Firestore is not configured");
    }

    // Write to Firestore with the document id stored on the comment for admin workflows.
    const docRef = db.collection("comments").doc();
    const comment = {
      ...validated,
      id: docRef.id,
      updatedAt: new Date().toISOString()
    };

    await docRef.set(comment);

    return apiCreated(comment);
  } catch (error: any) {
    // Check if it's a validation error
    if (error.message.startsWith("[{")) {
      try {
        const errors = JSON.parse(error.message);
        return apiBadRequest(errors);
      } catch {
        // Fall through
      }
    }

    console.error("Error submitting comment:", error);
    return apiError(error instanceof Error ? error : new Error(String(error)));
  }
}

/**
 * GET /api/comments?entityType=blog&entityId=post-001
 * Fetch approved comments for public display
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const entityType = searchParams.get("entityType");
    const entityId = searchParams.get("entityId");

    if (!entityType || !entityId) {
      return apiBadRequest("entityType and entityId are required");
    }

    if (!["blog", "event"].includes(entityType)) {
      return apiBadRequest("entityType must be 'blog' or 'event'");
    }

    const db = getAdminDb();
    if (!db) {
      return apiServiceUnavailable("Firestore is not configured");
    }

    const snapshot = await db
      .collection("comments")
      .where("entityType", "==", entityType)
      .where("entityId", "==", entityId)
      .where("status", "==", "approved")
      .orderBy("createdAt", "desc")
      .get();

    const comments = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json({
      success: true,
      data: comments,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return apiError(error instanceof Error ? error : new Error(String(error)));
  }
}
