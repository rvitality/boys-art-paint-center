import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    deleteDocument,
    getProductDocuments,
    updateDocument,
    uploadNewProduct,
} from "../../utils/firebase/firebase.utils";
import { productsActions } from "./products-slice";

export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async (collectionName = "cities", { rejectWithValue }) => {
        try {
            const response = await getProductDocuments(collectionName);
            console.log(response);
            return response;
        } catch (error) {
            console.error(error);
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            return rejectWithValue(message);
        }
    }
);

export const uploadProduct = createAsyncThunk(
    "products/uploadProduct",
    async ({ product, imgFileInput }, { rejectWithValue }) => {
        try {
            const response = await uploadNewProduct(product, imgFileInput);
            const { requestID, imageUrl, imageName } = response;

            return { ...product, id: requestID, imageUrl, imageName };
        } catch (error) {
            console.log(error);
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            return rejectWithValue(message);
        }
    }
);

export const setProductEdit = product => productsActions.setCurrentEdit(product);

export const updateProduct = createAsyncThunk(
    "products/updateProduct",
    async ({ collectionName = "cities", product, imgFileInput }) => {
        try {
            const response = await updateDocument(collectionName, product, imgFileInput);
            return response;
        } catch (err) {
            console.log(err);
        }
    }
);

export const deleteProduct = createAsyncThunk(
    "products/deleteProduct",
    async ({ collectionName = "cities", product }) => {
        try {
            const response = await deleteDocument(collectionName, product);
            console.log(response);
            return product;
        } catch (err) {
            console.log(err);
        }
    }
);
