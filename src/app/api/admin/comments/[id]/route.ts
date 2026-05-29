import { requireAdminFromRequest } from "@/lib/auth";
import { getAdminDb } from "@/lib/firebaseAdmin";
import {
  apiUnauthorized,
  apiBadRequest,
  apiNotFound,
  apiError,
  apiSuccess,
  handleApiError
} from "@/lib/api-utils";

/**
 * GET /api/admin/comments/[id]
 * Fetch a specific comment
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireAdminFromRequest(request);
    if (!user) return apiUnauthorized();

    const { id } = await params;

    const db = getAdminDb();
    if (!db) {
      return apiError("Firebase Admin not configured");
    }

    const doc = await db.collection("comments").doc(id).get();
    if (!doc.exists) {
      return apiNotFound("Comment not found");
    }

    return apiSuccess({
      id: doc.id,
      ...doc.data()
    });
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * PATCH /api/admin/comments/[id]
 * Update comment status or moderation notes
 */
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireAdminFromRequest(request);
    if (!user) return apiUnauthorized();

    const { id } = await params;
    const body = await request.json();
    const { status, notes } = body;

    if (!status || !["pending", "approved", "rejected"].includes(status)) {
      return apiBadRequest("status must be pending, approved, or rejected");
    }

    const db = getAdminDb();
    if (!db) {
      return apiError("Firebase Admin not configured");
    }

    // Verify comment exists
    const doc = await db.collection("comments").doc(id).get();
    if (!doc.exists) {
      return apiNotFound("Comment not found");
    }

    // Update status
    await db.collection("comments").doc(id).update({
      status,
      notes: notes || "",
      moderatedBy: user.uid,
      moderatedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    return apiSuccess({
      id,
      status,
      moderatedAt: new Date().toISOString()
    });
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * DELETE /api/admin/comments/[id]
 * Delete a comment
 */
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireAdminFromRequest(request);
    if (!user) return apiUnauthorized();

    const { id } = await params;

    const db = getAdminDb();
    if (!db) {
      return apiError("Firebase Admin not configured");
    }

    await db.collection("comments").doc(id).delete();

    return apiSuccess({
      id,
      deleted: true
    });
  } catch (error) {
    return handleApiError(error);
  }
}
