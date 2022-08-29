import { initializeApp } from "firebase/app";

import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

import {
    doc,
    getFirestore,
    collection,
    addDoc,
    updateDoc,
    query,
    getDocs,
    serverTimestamp,
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

export const getProductDocuments = async (collectionName = "products") => {
    if (!collectionName) return;

    const collectionRef = collection(db, collectionName);
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);

    // const snapshot = await getDocs(collectionRef);

    return querySnapshot.docs?.map(docSnapshot => {
        const createdDate = docSnapshot.data().created.toDate();
        const created = `${createdDate.getDate()}/${
            createdDate.getMonth() + 1
        }/${createdDate.getFullYear()}`;

        return { ...docSnapshot.data(), id: docSnapshot.id, created, updated: created };
    });
};

export const getDataAndDocuments = async collectionName => {
    if (!collectionName) return;

    const collectionRef = collection(db, collectionName);
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);

    // const snapshot = await getDocs(collectionRef);

    return querySnapshot.docs?.map(docSnapshot => docSnapshot.data());
};

export const addNewProduct = async (product, url) => {
    if (!product) return;

    const response = await addDoc(collection(db, "cities"), {
        imageUrl: url,
        created: serverTimestamp(),
        updated: serverTimestamp(),
        ...product,
    });

    // console.log("product");
    return response;
};

export const uploadNewProduct = (product, imgUpload) => {
    if (!imgUpload) return;

    // ! upload img first to storage to get the download url before adding the new product to firestore db

    const storage = getStorage();
    const productImagesRef = ref(storage, `products/${imgUpload.name}`);

    return uploadBytes(productImagesRef, imgUpload)
        .then(snapshot => {
            return getDownloadURL(snapshot.ref).then(url => {
                // console.log("image");
                return addNewProduct(product, url).then(res => res);
            });
        })
        .catch(err => {
            console.log(err.message);
            return err.message;
        });
};

export const updateDocument = async (collectionName, product) => {
    const { id, price } = product;

    const documentRef = doc(db, collectionName, id);
    return await updateDoc(documentRef, { price: price + 5 });
};

// ! AUTH -------------------------------------------

export const signInAuthWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);
