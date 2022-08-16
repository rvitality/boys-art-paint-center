import { initializeApp } from "firebase/app";

import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs,
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC65-8IiVFbEwbuiCLV9KkHDhizPvwP_zY",
    authDomain: "kokopipdelivery.firebaseapp.com",
    databaseURL: "https://kokopipdelivery.firebaseio.com",
    projectId: "kokopipdelivery",
    storageBucket: "kokopipdelivery.appspot.com",
    messagingSenderId: "206242016385",
    appId: "1:206242016385:web:131545e9792972f9cbf180",
    measurementId: "G-8ZJZDM2KBX",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth();

export const db = getFirestore();

export const getDataAndDocuments = async collectionName => {
    const collectionRef = collection(db, collectionName);
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(docSnapshot => docSnapshot.data());
};

export const signInAuthWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);
