"use client";

import { useEffect } from "react";
import { getAnalyticsInstance } from "@/lib/firestore";

export function FirebaseAnalytics() {
  useEffect(() => {
    void getAnalyticsInstance();
  }, []);

  return null;
}
