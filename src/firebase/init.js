import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { firebaseConfig } from "./config";

export const app = initializeApp(firebaseConfig);

export const analyticsPromise = isSupported().then((supported) =>
  supported ? getAnalytics(app) : null
);
