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

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ collection: string; id: string }> }
) {
  const { collection, id } = await params;
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

  await db.collection(collection).doc(id).delete();
  return NextResponse.json({ ok: true });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ collection: string; id: string }> }
) {
  const { collection, id } = await params;
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
  const item = { ...body, id, updatedAt: new Date().toISOString() };
  await db.collection(collection).doc(id).set(item, { merge: true });
  return NextResponse.json({ item });
}
