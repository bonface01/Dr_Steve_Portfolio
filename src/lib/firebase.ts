"use client";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
    firebaseConfig.authDomain &&
    firebaseConfig.projectId &&
    firebaseConfig.storageBucket &&
    firebaseConfig.appId
);

export function getFirebaseApp() {
  if (!isFirebaseConfigured) return null;
  return firebase.apps.length ? firebase.apps[0] : firebase.initializeApp(firebaseConfig);
}

export function getClientAuth() {
  const app = getFirebaseApp();
  return app ? app.auth() : null;
}

export function getClientDb() {
  const app = getFirebaseApp();
  return app ? app.firestore() : null;
}

export function getClientStorage() {
  const app = getFirebaseApp();
  return app ? app.storage() : null;
}
