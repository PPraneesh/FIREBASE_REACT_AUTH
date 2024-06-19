import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = import.meta.env.VITE_FIREBASE_CONFIG;


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);




export {
  app,
  auth
};