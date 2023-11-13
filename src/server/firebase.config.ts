import "firebase/firestore";
import "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";

export const app = initializeApp({
  apiKey: "AIzaSyDBxeaJn08xMzyOKuyVyV4K6Saz89I4W3U",
  authDomain: "todos-4e9ee.firebaseapp.com",
  projectId: "todos-4e9ee",
  storageBucket: "todos-4e9ee.appspot.com",
  messagingSenderId: "95395313137",
  appId: "1:95395313137:web:514220fbe6525eb3c98050",
});

const auth = getAuth(app);
let userId = "";
onAuthStateChanged(auth, (user) => {
  if (user) {
    userId = user.uid;
  }
});
const provider = new GoogleAuthProvider();

export { auth, provider, userId };
