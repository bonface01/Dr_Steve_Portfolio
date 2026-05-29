import { NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebaseAdmin";
import { validateContactInput } from "@/lib/validation";
import { apiCreated, apiBadRequest, apiError, apiServiceUnavailable } from "@/lib/api-utils";

/**
 * POST /api/contact
 * Public endpoint for contact form submissions
 * Submissions are saved to Firestore for admin review
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate input
    const validated = validateContactInput(body);

    const db = getAdminDb();
    if (!db) {
      return apiServiceUnavailable("Firestore is not configured");
    }

    // Write to Firestore
    const docRef = await db.collection("contactSubmissions").add({
      ...validated,
      updatedAt: new Date().toISOString()
    });

    return apiCreated({
      id: docRef.id,
      ...validated
    });
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

    console.error("Error processing contact submission:", error);
    return apiError(error);
  }
}
