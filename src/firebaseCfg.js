import { initializeApp } from "firebase/app";

// import { getAnalytics } from "firebase/getAnalytics";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyD4NW466CndhoFxG7jwueZMpzYXOYjDNIw",
  authDomain: "internburger-6dd37.firebaseapp.com",
  projectId: "internburger-6dd37",
  storageBucket: "internburger-6dd37.appspot.com",
  messagingSenderId: "650154867699",
  appId: "1:650154867699:web:5228956507ff1d6d127086",
  measurementId: "G-E8GKYZ8MX3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

// export const db = getAnalytics(app);