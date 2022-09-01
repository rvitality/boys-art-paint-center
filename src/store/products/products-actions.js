import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProductDocuments } from "../../utils/firebase/firebase.utils";

export const fetchProducts = createAsyncThunk("posts/fetchProducts", async () => {
    const response = await getProductDocuments("cities");
    return response;
});
