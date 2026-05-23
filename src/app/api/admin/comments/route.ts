import { requireAdminFromRequest } from "@/lib/auth";
import { getAdminDb } from "@/lib/firebaseAdmin";
import {
  apiUnauthorized,
  apiBadRequest,
  apiError,
  apiSuccess,
  handleApiError
} from "@/lib/api-utils";

/**
 * GET /api/admin/comments?status=pending
 * Fetch comments for moderation
 */
export async function GET(request: Request) {
  try {
    const user = await requireAdminFromRequest(request);
    if (!user) return apiUnauthorized();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || "pending";

    if (!["pending", "approved", "rejected"].includes(status)) {
      return apiBadRequest("status must be pending, approved, or rejected");
    }

    const db = getAdminDb();
    if (!db) {
      return apiError("Firebase Admin not configured");
    }

    const snapshot = await db
      .collection("comments")
      .where("status", "==", status)
      .orderBy("createdAt", "desc")
      .get();

    const comments = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    return apiSuccess(comments);
  } catch (error) {
    return handleApiError(error);
  }
}

