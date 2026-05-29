import { readFile } from "node:fs/promises";
import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const required = ["FIREBASE_PROJECT_ID", "FIREBASE_CLIENT_EMAIL", "FIREBASE_PRIVATE_KEY"];
const missing = required.filter((key) => !process.env[key]);

if (missing.length) {
  console.error(`Missing required environment variables: ${missing.join(", ")}`);
  process.exit(1);
}

initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
  })
});

const db = getFirestore();
const seed = JSON.parse(await readFile(new URL("../seed/firestore-seed.json", import.meta.url), "utf8"));

for (const [collectionName, items] of Object.entries(seed)) {
  for (const item of items) {
    await db.collection(collectionName).doc(item.id).set({
      ...item,
      seededAt: new Date().toISOString()
    });
    console.log(`Seeded ${collectionName}/${item.id}`);
  }
}

console.log("Firestore seed complete.");
