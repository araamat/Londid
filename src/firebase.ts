import { initializeApp } from "firebase/app";
import { browserSessionPersistence, getAuth, setPersistence } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBZhFCTH6MMmIF14_gikTm-B1sZfjqDqJg",
  authDomain: "rental-system-86d59.firebaseapp.com",
  projectId: "rental-system-86d59",
  storageBucket: "rental-system-86d59.appspot.com",
  messagingSenderId: "26319192023",
  appId: "1:26319192023:web:3b5a3f3aaff4304c719592",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;