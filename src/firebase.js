import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBTVxo9m10uPV2OBeMN3xttUxmvk6KWWWc",
  authDomain: "habitquest-8e150.firebaseapp.com",
  projectId: "habitquest-8e150",
  storageBucket: "habitquest-8e150.firebasestorage.app",
  messagingSenderId: "830721316810",
  appId: "1:830721316810:web:b4ee8d230ccc5660ec6133",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();