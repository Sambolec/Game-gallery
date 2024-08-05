
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyDYBx6uio9PeiMV1xHjYs9kfPcBTXHcf4U",
  authDomain: "vue-fire-auth-gg.firebaseapp.com",
  projectId: "vue-fire-auth-gg",
  storageBucket: "vue-fire-auth-gg.appspot.com",
  messagingSenderId: "544652819827",
  appId: "1:544652819827:web:4922bab94969b9c6ec9906",
  measurementId: "G-0R9JN5LXKF"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export {db}
export { auth }