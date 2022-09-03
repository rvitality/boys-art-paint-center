import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProductDocuments, uploadNewProduct } from "../../utils/firebase/firebase.utils";

export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async (collectionName = "cities", { rejectWithValue }) => {
        try {
            const response = await getProductDocuments(collectionName);
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
    "products",
    async ({ product, imgFileInput }, { rejectWithValue }) => {
        try {
            const response = await uploadNewProduct(product, imgFileInput);
            return response;
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
