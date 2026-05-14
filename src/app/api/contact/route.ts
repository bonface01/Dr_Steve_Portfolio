import { NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebaseAdmin";

export async function POST(request: Request) {
  const body = await request.json();
  const required = ["name", "email", "message"];
  const missing = required.some((field) => !body[field]);

  if (missing) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const db = getAdminDb();
  const submission = {
    ...body,
    createdAt: new Date().toISOString(),
    status: "new"
  };

  if (db) {
    await db.collection("contactSubmissions").add(submission);
  } else {
    console.info("Contact submission received without Firebase Admin configuration", submission);
  }

  return NextResponse.json({ ok: true });
}
