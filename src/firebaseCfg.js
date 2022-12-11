import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/getAnalytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD4NW466CndhoFxG7jwueZMpzYXOYjDNIw",
  authDomain: "internburger-6dd37.firebaseapp.com",
  databaseURL: "https://internburger-6dd37-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "internburger-6dd37",
  storageBucket: "internburger-6dd37.appspot.com",
  messagingSenderId: "650154867699",
  appId: "1:650154867699:web:a93124bfc9cd9e42127086",
  measurementId: "G-ZKVG7P74P6"
};
const app = initializeApp(firebaseConfig);


export const auth = getAuth(app)

// export const db = getAnalytics(app);