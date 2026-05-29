import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { readFile } from "node:fs/promises";
import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { existsSync } from "node:fs";

const SERVICE_ACCOUNT_PATH = new URL("../service-account.json", import.meta.url);
let credential;

if (existsSync(SERVICE_ACCOUNT_PATH)) {
  console.log("Using service-account.json for authentication.");
  const saFile = JSON.parse(await readFile(SERVICE_ACCOUNT_PATH, "utf8"));
  credential = cert(saFile);
} else {
  const required = ["FIREBASE_PROJECT_ID", "FIREBASE_CLIENT_EMAIL", "FIREBASE_PRIVATE_KEY"];
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length) {
    console.error(`Missing required environment variables: ${missing.join(", ")}`);
    console.error("Alternatively, place your service account JSON at c:\\Users\\hp\\projects\\service-account.json");
    process.exit(1);
  }

  credential = cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
  });
}

initializeApp({ credential });

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
