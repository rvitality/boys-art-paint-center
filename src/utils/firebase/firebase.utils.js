import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

import { v4 } from "uuid";

import {
    doc,
    getFirestore,
    collection,
    addDoc,
    updateDoc,
    query,
    getDocs,
    serverTimestamp,
    orderBy,
    Timestamp,
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

const formatDate = dateObj =>
    `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`;

export const getProductDocuments = async (collectionName = "cities") => {
    if (!collectionName) return;

    const collectionRef = collection(db, collectionName);
    const q = query(collectionRef, orderBy("updated", "desc"));

    const querySnapshot = await getDocs(q);

    // const snapshot = await getDocs(collectionRef);

    return querySnapshot.docs?.map(docSnapshot => {
        const createdFormattedDate = formatDate(docSnapshot.data().created.toDate());
        const updatedFormattedDate = formatDate(docSnapshot.data().updated.toDate());

        return {
            ...docSnapshot.data(),
            id: docSnapshot.id,
            created: createdFormattedDate,
            updated: updatedFormattedDate,
        };
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
    console.log(product);
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

export const uploadNewProduct = (product, imgFileInput) => {
    if (!imgFileInput) return;

    // ! upload the img first to storage to get the download url before adding the new product to firestore db

    const storage = getStorage();
    const productImagesRef = ref(storage, `products/${imgFileInput.name + v4()}`);

    return uploadBytes(productImagesRef, imgFileInput)
        .then(snapshot => {
            return getDownloadURL(snapshot.ref).then(url => {
                console.log(url);
                return addNewProduct(product, url).then(res => ({
                    requestID: res.id,
                    imageUrl: url,
                }));
            });
        })
        .catch(err => {
            console.log(err.message);
            return err.message;
        });
};

export const updateDocument = async (collectionName, product, imgFileInput) => {
    try {
        let updatedProduct = product;

        // check if img is "retain" or hasn't been changed
        if (imgFileInput !== "retain") {
            const storage = getStorage();
            const productImagesRef = ref(storage, `products/${imgFileInput.name + v4()}`);

            // const uploadResponseByte = await uploadBytes(productImagesRef, imgFileInput);
            // const imgDownloadURL = await getDownloadURL(uploadResponseByte.ref).then(url => {
            //     console.log(url);
            // });

            uploadBytes(productImagesRef, imgFileInput)
                .then(snapshot => {
                    return getDownloadURL(snapshot.ref).then(url => {
                        console.log("UPLOADED: ", url);
                        updatedProduct = { ...product, imageUrl: url };
                    });
                })
                .catch(err => {
                    console.log(err.message);
                    return err.message;
                });
        }

        const { id } = product;
        const documentRef = doc(db, collectionName, id);
        await updateDoc(documentRef, { ...product, updated: serverTimestamp() });

        const dateObj = Timestamp.now().toDate();
        const formattedDate = `${dateObj.getDate()}/${
            dateObj.getMonth() + 1
        }/${dateObj.getFullYear()}`;

        return { ...updatedProduct, updated: formattedDate };
    } catch (err) {
        console.log(err);
        return err;
    }
};

// ! AUTH -------------------------------------------

export const signInAuthWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);
