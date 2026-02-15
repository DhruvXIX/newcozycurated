import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

import { getAuth } from "firebase/auth";

// Use environment variables so you can plug in your own Firebase project
const firebaseConfig = {
  apiKey: "AIzaSyAPVV5_jiUpj65OaQ3F_jHPUdwO0AxVvmU",
  authDomain: "cozy-curated-108.firebaseapp.com",
  databaseURL: "https://cozy-curated-108-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "cozy-curated-108",
  storageBucket: "cozy-curated-108.firebasestorage.app",
  messagingSenderId: "488542541310",
  appId: "1:488542541310:web:ce5b6fe7c36eb1e0b0dcaf",
  measurementId: "G-PYRCXY1PPN"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export const auth = getAuth(app);
export const db = getDatabase(app);

