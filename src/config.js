import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore,collection,getDocs } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAoXH6rB6Lky9V-4FHg-i8DLOETOdK8Qy8",
    authDomain: "myreactapp-5dea3.firebaseapp.com",
    projectId: "myreactapp-5dea3",
    storageBucket:  "myreactapp-5dea3.firebasestorage.app",
    messagingSenderId: "430313904879",
    appId: "1:430313904879:web:880956af8ad10e58b3191a",
    measurementId: "G-8KCW4H1S3S"
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