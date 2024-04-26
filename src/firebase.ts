import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBZhFCTH6MMmIF14_gikTm-B1sZfjqDqJg",
  authDomain: "rental-system-86d59.firebaseapp.com",
  projectId: "rental-system-86d59",
  storageBucket: "rental-system-86d59.appspot.com",
  messagingSenderId: "26319192023",
  appId: "1:26319192023:web:3b5a3f3aaff4304c719592",
};

const app = initializeApp(firebaseConfig);
export function isMobile(): boolean {
  return window.matchMedia("(max-device-width: 480px)").matches
}

export const auth = getAuth(app);

export default app;