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
  apiForbidden,
  apiNotFound,
  apiError,
  apiSuccess,
  apiCreated,
  handleApiError
} from "@/lib/api-utils";

const ALLOWED_COLLECTIONS = new Set(["blogPosts", "events", "galleryItems", "comments"]);

/**
 * GET /api/admin/content/[collection]
 * Fetch all items in a collection (admin only)
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ collection: string }> }
) {
  try {
    const { collection } = await params;

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

    const snapshot = await db.collection(collection).get();
    const items = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    return apiSuccess(items);
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * POST /api/admin/content/[collection]
 * Create a new item in collection (admin only)
 */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ collection: string }> }
) {
  try {
    const { collection } = await params;

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
      validated = validateBlogPostInput(body);
    } else if (collection === "events") {
      validated = validateEventInput(body);
    } else if (collection === "galleryItems") {
      validated = validateGalleryInput(body);
    } else {
      return apiNotFound("Unsupported collection");
    }

    const db = getAdminDb();
    if (!db) {
      return apiError("Firebase Admin not configured");
    }

    // Create document with explicit ID
    const docId = validated.id || `${collection}-${Date.now()}`;
    await db.collection(collection).doc(docId).set(
      {
        ...validated,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: user.uid
      },
      { merge: true }
    );

    return apiCreated({
      id: docId,
      ...validated,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    return handleApiError(error);
  }
}

