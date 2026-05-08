import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAm8dH-O8ZBxXAICDK1PQVQb39KzWmCV2Y",
  authDomain: "harborforge-412b3.firebaseapp.com",
  projectId: "harborforge-412b3",
  storageBucket: "harborforge-412b3.firebasestorage.app",
  messagingSenderId: "783651945000",
  appId: "1:783651945000:web:12b3177b72a06be070131d",
  measurementId: "G-1L0F025VT8"
};

const app = initializeApp(firebaseConfig);

export const analytics =
  typeof window !== "undefined"
    ? getAnalytics(app)
    : null;

export default app;
