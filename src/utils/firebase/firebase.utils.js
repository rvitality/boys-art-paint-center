import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes, deleteObject } from "firebase/storage";

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
    deleteDoc,
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

const storage = getStorage();

export const db = getFirestore();

const formatDate = dateObj =>
    `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`;

// ! FETCH ------------------------------------------

export const getProductDocuments = async (collectionName = "products") => {
    if (!collectionName) return;

    const collectionRef = collection(db, collectionName);
    const q = query(collectionRef, orderBy("updated", "desc"));

    const querySnapshot = await getDocs(q);

    // const snapshot = await getDocs(collectionRef);

    return querySnapshot.docs?.map(docSnapshot => {
        // const createdFormattedDate = formatDate(docSnapshot.data().created.toDate());
        // const updatedFormattedDate = formatDate(docSnapshot.data().updated.toDate());

        const { created, updated } = docSnapshot.data();

        const createdFormattedDate = formatDate(new Date(created * 1000));
        const updatedFormattedDate = formatDate(new Date(updated * 1000));

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

// ! ADD ------------------------------------------

export const addNewProduct = async (product, url) => {
    console.log(product);
    if (!product) return;

    const response = await addDoc(collection(db, "cities"), {
        imageUrl: url,
        created: Timestamp.now().seconds,
        updated: Timestamp.now().seconds,
        ...product,
    });

    // console.log("product");
    return response;
};

export const uploadNewProduct = (product, imgFileInput) => {
    if (!imgFileInput) return;

    // ! upload the img first to storage to get the download url before adding the new product to firestore db

    const storage = getStorage();
    const productImagesRef = ref(storage, `products/${imgFileInput.name}`);

    return uploadBytes(productImagesRef, imgFileInput)
        .then(snapshot => {
            return getDownloadURL(snapshot.ref).then(url => {
                const newProduct = { ...product, imageName: imgFileInput.name };

                return addNewProduct(newProduct, url).then(res => ({
                    requestID: res.id,
                    imageUrl: url,
                    imageName: imgFileInput.name,
                }));
            });
        })
        .catch(err => {
            console.log(err.message);
            return err.message;
        });
};

// ! UPDATE ------------------------------------------

export const updateDocument = async (collectionName, product, imgFileInput) => {
    let updatedProduct = product;

    try {
        const update = async (imgDownloadURL, imageName) => {
            if (imgDownloadURL) {
                updatedProduct = { ...updatedProduct, imageUrl: imgDownloadURL, imageName };
            }

            const { id } = updatedProduct;
            const documentRef = doc(db, collectionName, id);

            await updateDoc(documentRef, { ...updatedProduct, updated: Timestamp.now().seconds });

            console.log();

            // const dateObj = Timestamp.now().toDate();
            // const formattedDate = `${dateObj.getDate()}/${
            //     dateObj.getMonth() + 1
            // }/${dateObj.getFullYear()}`;

            return { ...updatedProduct, updated: Timestamp.now().seconds };
        };

        // check if img is "retain" or has been changed
        if (imgFileInput !== "retain") {
            const storage = getStorage();
            const productImagesRef = ref(storage, `products/${imgFileInput.name}`);

            const uploadResponseByte = await uploadBytes(productImagesRef, imgFileInput);
            const imgDownloadURL = await getDownloadURL(uploadResponseByte.ref);

            const product = await update(imgDownloadURL, imgFileInput.name);
            return product;
        }

        const product = await update();
        return product;
    } catch (err) {
        console.log(err);
        return err;
    }
};

// ! DELETE ------------------------------------------
export const deleteDocument = async (collectionName, product) => {
    // delete img from storage
    const imageRef = ref(storage, `products/${product.imageName}`);
    console.log(product);
    console.log(imageRef);

    // Delete the file
    deleteObject(imageRef)
        .then(() => {
            // File deleted successfully
            console.log("Image from storage deleted susccessfully.");
        })
        .catch(error => {
            // Uh-oh, an error occurred!
            console.log("Error! Image hasn't been deleted.");
        });

    const productsDoc = doc(db, collectionName, product.id);
    const res = await deleteDoc(productsDoc);
    return res;
};

// ! AUTH -------------------------------------------

export const signInAuthWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);
