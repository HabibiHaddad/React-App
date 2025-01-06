import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore,collection,getDocs } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket:  process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
  };

  const app = initializeApp(firebaseConfig)

  const db = getFirestore()
  const storage = getStorage(app);
  const auth = getAuth(app);
  //USED For fetching data
  //const colRef = collection(db,THE name to fetch from in the collection in DB in firestore)
  //getDocs(colRef).then((snapshot) => {
   // console.log(snapshot.docs)
   // })
   export {db, storage,auth};