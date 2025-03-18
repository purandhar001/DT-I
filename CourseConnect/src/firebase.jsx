import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyCdiFLLbOMpUqoaqZ1-DzpOU6fgbi7L2eQ",
    authDomain: "auth-courseconnect.firebaseapp.com",
    projectId: "auth-courseconnect",
    storageBucket: "auth-courseconnect.firebasestorage.app",
    messagingSenderId: "656982805455",
    appId: "1:656982805455:web:d8b2eabdc4365f6bdaa0ba"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
