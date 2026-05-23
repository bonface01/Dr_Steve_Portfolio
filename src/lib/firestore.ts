/**
 * Modular Firebase SDK (v9+)
 * Replaces legacy compat imports
 */

import { initializeApp, getApps } from "firebase/app";
import { getAuth as firebaseGetAuth, Auth } from "firebase/auth";
import { getFirestore as firebaseGetFirestore, Firestore } from "firebase/firestore";
import { getStorage as firebaseGetStorage, FirebaseStorage } from "firebase/storage";
import { getAnalytics, Analytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
    firebaseConfig.authDomain &&
    firebaseConfig.projectId &&
    firebaseConfig.storageBucket &&
    firebaseConfig.appId
);

let firebaseApp: any = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let storage: FirebaseStorage | null = null;
let analytics: Analytics | null = null;

/**
 * Initialize Firebase app (only once)
 */
export function initFirebase() {
  if (firebaseApp) return firebaseApp;

  if (!isFirebaseConfigured) {
    console.warn("Firebase is not configured. Client features will be limited.");
    return null;
  }

  try {
    firebaseApp = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
    return firebaseApp;
  } catch (error) {
    console.error("Failed to initialize Firebase:", error);
    return null;
  }
}

/**
 * Get Firebase Auth instance
 */
export function getAuth(): Auth | null {
  if (auth) return auth;

  const app = initFirebase();
  if (!app) return null;

  try {
    auth = firebaseGetAuth(app);
    return auth;
  } catch (error) {
    console.error("Failed to get Auth instance:", error);
    return null;
  }
}

/**
 * Get Firestore instance
 */
export function getDb(): Firestore | null {
  if (db) return db;

  const app = initFirebase();
  if (!app) return null;

  try {
    db = firebaseGetFirestore(app);
    return db;
  } catch (error) {
    console.error("Failed to get Firestore instance:", error);
    return null;
  }
}

/**
 * Get Firebase Storage instance
 */
export function getStorage(): FirebaseStorage | null {
  if (storage) return storage;

  const app = initFirebase();
  if (!app) return null;

  try {
    storage = firebaseGetStorage(app);
    return storage;
  } catch (error) {
    console.error("Failed to get Storage instance:", error);
    return null;
  }
}

/**
 * Get Firebase Analytics instance
 * Only available in browser and if supported
 */
export async function getAnalyticsInstance(): Promise<Analytics | null> {
  if (analytics) return analytics;

  if (typeof window === "undefined") return null;

  const app = initFirebase();
  if (!app) return null;

  try {
    const supported = await isSupported();
    if (!supported) return null;

    analytics = getAnalytics(app);
    return analytics;
  } catch (error) {
    console.warn("Analytics not available:", error);
    return null;
  }
}

// Re-export commonly used Firebase functions
export {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence
} from "firebase/auth";

export {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  writeBatch,
  Timestamp
} from "firebase/firestore";

export {
  ref,
  uploadBytes,
  getBytes,
  getDownloadURL,
  deleteObject,
  listAll
} from "firebase/storage";

export type { Auth, Firestore, FirebaseStorage };
