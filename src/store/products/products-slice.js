import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "./products-actions";

const initialState = {
    productItems: [],
    status: "idle",
    error: {},
};

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        addProduct(state, action) {
            console.log("PAYLOAD:  ", action.payload);
            state.productItems = [action.payload, ...state.productItems];
            // state.productItems = state.productItems.unshift(action.payload);
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchProducts.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.productItems = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = "failed";
                state.error = { title: "Error!", message: action.error.message };
            });
    },
});

export const productsActions = productsSlice.actions;

export default productsSlice;
