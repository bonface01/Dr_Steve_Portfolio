import { NextResponse } from "next/server";
import { getAdminAuth, getAdminDb } from "@/lib/firebaseAdmin";

const allowedCollections = new Set(["blogPosts", "events", "galleryItems", "comments"]);

async function assertAdmin(request: Request) {
  const auth = getAdminAuth();
  if (!auth) return false;
  const token = request.headers.get("authorization")?.replace("Bearer ", "");
  if (!token) return false;
  await auth.verifyIdToken(token);
  return true;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ collection: string }> }
) {
  const { collection } = await params;
  if (!allowedCollections.has(collection)) {
    return NextResponse.json({ error: "Unknown collection" }, { status: 404 });
  }

  const db = getAdminDb();
  if (!db) {
    return NextResponse.json({ error: "Firebase Admin is not configured" }, { status: 501 });
  }

  const snapshot = await db.collection(collection).get();
  return NextResponse.json({ items: snapshot.docs.map((doc) => doc.data()) });
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ collection: string }> }
) {
  const { collection } = await params;
  if (!allowedCollections.has(collection)) {
    return NextResponse.json({ error: "Unknown collection" }, { status: 404 });
  }
  if (!(await assertAdmin(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = getAdminDb();
  if (!db) {
    return NextResponse.json({ error: "Firebase Admin is not configured" }, { status: 501 });
  }

  const body = await request.json();
  const id = body.id || `${collection}-${Date.now()}`;
  const item = { ...body, id, updatedAt: new Date().toISOString() };
  await db.collection(collection).doc(id).set(item, { merge: true });
  return NextResponse.json({ item });
}
