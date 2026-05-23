import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { getAdminApp, isFirebaseAdminConfigured } from "./firebaseAdmin";

export type UserRole = "admin" | "user" | "none";

export interface AuthUser {
  uid: string;
  email: string | null;
  role: UserRole;
}

/**
 * Verify Firebase ID token and return user info.
 * Used in API routes for auth verification.
 */
export async function verifyIdToken(token: string | null): Promise<AuthUser | null> {
  if (!token || !isFirebaseAdminConfigured) return null;

  try {
    const auth = getAuth(getAdminApp()!);
    const decodedToken = await auth.verifyIdToken(token);
    const uid = decodedToken.uid;

    // Fetch user role from Firestore
    const db = getFirestore(getAdminApp()!);
    const userDoc = await db.collection("users").doc(uid).get();
    const role = (userDoc.data()?.role as UserRole) || "user";

    return {
      uid,
      email: decodedToken.email || null,
      role
    };
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
}

/**
 * Extract token from Authorization header.
 * Format: "Bearer <token>"
 */
export function extractBearerToken(authHeader: string | null): string | null {
  if (!authHeader) return null;
  const parts = authHeader.split(" ");
  return parts.length === 2 && parts[0] === "Bearer" ? parts[1] : null;
}

/**
 * Verify admin role from request headers.
 * Returns user if verified as admin, null otherwise.
 */
export async function verifyAdminFromRequest(request: Request): Promise<AuthUser | null> {
  const authHeader = request.headers.get("authorization");
  const token = extractBearerToken(authHeader);
  const user = await verifyIdToken(token);

  if (user && user.role === "admin") {
    return user;
  }

  return null;
}

/**
 * Verify that user is admin or throw error.
 * Use in API routes that require admin access.
 */
export async function requireAdminFromRequest(request: Request): Promise<AuthUser> {
  const user = await verifyAdminFromRequest(request);
  if (!user) {
    throw new Error("UNAUTHORIZED");
  }
  return user;
}

/**
 * Create or update user document in Firestore.
 * Called after Firebase Auth user creation.
 */
export async function ensureUserDocument(
  uid: string,
  email: string | null,
  role: UserRole = "user"
): Promise<void> {
  if (!isFirebaseAdminConfigured) return;

  const db = getFirestore(getAdminApp()!);
  await db.collection("users").doc(uid).set(
    {
      uid,
      email,
      role,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    { merge: true }
  );
}

/**
 * Set admin role for a user.
 * Only callable by other admins via API.
 */
export async function setAdminRole(uid: string, isAdmin: boolean): Promise<void> {
  if (!isFirebaseAdminConfigured) return;

  const db = getFirestore(getAdminApp()!);
  await db.collection("users").doc(uid).update({
    role: isAdmin ? "admin" : "user",
    updatedAt: new Date().toISOString()
  });
}
