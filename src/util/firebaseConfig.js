import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAwMuQTNoPJNbj7ruKm8CR8liQdK7SMOv0",
  authDomain: "thephone-store.firebaseapp.com",
  projectId: "thephone-store",
  storageBucket: "thephone-store.appspot.com",
  messagingSenderId: "851670897598",
  appId: "1:851670897598:web:49dddf471c7186d169dfef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;