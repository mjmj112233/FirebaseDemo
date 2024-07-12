import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDebid4ixRn9wnXJn5WngarIcBxf2RlSIY",
  authDomain: "test-663d4.firebaseapp.com",
  projectId: "test-663d4",
  storageBucket: "test-663d4.appspot.com",
  messagingSenderId: "316591053466",
  appId: "1:316591053466:web:30fa427ddbaec31c5c9d23",
  measurementId: "G-57E3D9Q5QR"
};

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);
  
  export { db, auth }