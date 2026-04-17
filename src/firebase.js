import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB8X5PWZVKWov8iVJkBhNHcvr5ztcck_Wo",
  authDomain: "orthonexis-d761c.firebaseapp.com",
  projectId: "orthonexis-d761c",
  storageBucket: "orthonexis-d761c.firebasestorage.app",
  messagingSenderId: "1073954220909",
  appId: "1:1073954220909:web:5774d5a10467f186b44864"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;