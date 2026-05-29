import { NextResponse } from "next/server";
import { requireAdminFromRequest } from "@/lib/auth";
import { getAdminDb } from "@/lib/firebaseAdmin";
import {
  validateBlogPostInput,
  validateEventInput,
  validateGalleryInput
} from "@/lib/validation";
import {
  apiUnauthorized,
  apiNotFound,
  apiError,
  apiSuccess,
  handleApiError
} from "@/lib/api-utils";

const ALLOWED_COLLECTIONS = new Set(["blogPosts", "events", "galleryItems", "comments"]);

/**
 * GET /api/admin/content/[collection]/[id]
 * Fetch a specific item (admin only)
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ collection: string; id: string }> }
) {
  try {
    const { collection, id } = await params;

    // Verify admin
    const user = await requireAdminFromRequest(request);
    if (!user) return apiUnauthorized();

    if (!ALLOWED_COLLECTIONS.has(collection)) {
      return apiNotFound(`Collection '${collection}' not found`);
    }

    const db = getAdminDb();
    if (!db) {
      return apiError("Firebase Admin not configured");
    }

    const doc = await db.collection(collection).doc(id).get();
    if (!doc.exists) {
      return apiNotFound(`Document not found`);
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
 * PATCH /api/admin/content/[collection]/[id]
 * Update an item (admin only)
 */
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ collection: string; id: string }> }
) {
  try {
    const { collection, id } = await params;

    // Verify admin
    const user = await requireAdminFromRequest(request);
    if (!user) return apiUnauthorized();

    if (!ALLOWED_COLLECTIONS.has(collection)) {
      return apiNotFound(`Collection '${collection}' not found`);
    }

    const body = await request.json();

    // Validate based on collection type
    let validated: any;
    if (collection === "blogPosts") {
      validated = validateBlogPostInput({ ...body, id });
    } else if (collection === "events") {
      validated = validateEventInput({ ...body, id });
    } else if (collection === "galleryItems") {
      validated = validateGalleryInput({ ...body, id });
    } else {
      return apiNotFound("Unsupported collection");
    }

    const db = getAdminDb();
    if (!db) {
      return apiError("Firebase Admin not configured");
    }

    await db.collection(collection).doc(id).set(
      {
        ...validated,
        updatedAt: new Date().toISOString(),
        updatedBy: user.uid
      },
      { merge: true }
    );

    return apiSuccess({
      id,
      ...validated,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * DELETE /api/admin/content/[collection]/[id]
 * Delete an item (admin only)
 */
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ collection: string; id: string }> }
) {
  try {
    const { collection, id } = await params;

    // Verify admin
    const user = await requireAdminFromRequest(request);
    if (!user) return apiUnauthorized();

    if (!ALLOWED_COLLECTIONS.has(collection)) {
      return apiNotFound(`Collection '${collection}' not found`);
    }

    const db = getAdminDb();
    if (!db) {
      return apiError("Firebase Admin not configured");
    }

    await db.collection(collection).doc(id).delete();

    return apiSuccess({
      id,
      deleted: true
    });
  } catch (error) {
    return handleApiError(error);
  }
}

