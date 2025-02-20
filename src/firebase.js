import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import 'firebase/storage';
import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyCmBMFah9yW7fdRrgfGLhC1w1N1QbJyeus",
//   authDomain: "evs-point-32b03.firebaseapp.com",
//   projectId: "evs-point-32b03",
//   storageBucket: "evs-point-32b03.appspot.com",
//   messagingSenderId: "1073170301450",
//   appId: "1:1073170301450:web:e3cd4889457bbc210bd5f3",
//   measurementId: "G-X09Y9SVEKJ"
// };

const firebaseConfig = {
  apiKey: "AIzaSyCDTpgJIIRir_6LaIwZqtVsAJM6rB8_9GQ",
  authDomain: "evcs-project-7e5bf.firebaseapp.com",
  projectId: "evcs-project-7e5bf",
  storageBucket: "evcs-project-7e5bf.firebasestorage.app",
  messagingSenderId: "648638441685",
  appId: "1:648638441685:web:a63d18fb4a185e18a59a5c"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

const analytics = getAnalytics(app);

const storage = getStorage(app);

export { db, auth, analytics, storage };
