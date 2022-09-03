import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts, uploadProduct } from "./products-actions";

const initialState = {
    productItems: [],
    fetchProductsStatus: "idle",
    fetchProductsError: {},
    uploadProductStatus: "idle",
    uploadProductSucess: {},
    uploadProductError: {},
};

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        // addProduct(state, action) {
        //     console.log("PAYLOAD:  ", action.payload);
        //     state.productItems = [action.payload, ...state.productItems];
        //     // state.productItems = state.productItems.unshift(action.payload);
        // },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchProducts.pending, (state, action) => {
                state.fetchProductsStatus = "loading";
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.fetchProductsStatus = "succeeded";
                state.productItems = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                console.log(action);
                state.fetchProductsStatus = "failed";
                state.fetchProductsError = {
                    title: "Error!",
                    message: "Something went wrong.",
                };
                // message: action.payload || "Something went wrong!",
            })
            .addCase(uploadProduct.pending, (state, action) => {
                state.uploadProductStatus = "loading";
            })
            .addCase(uploadProduct.fulfilled, (state, action) => {
                state.uploadProductStatus = "succeeded";
                state.productItems = [action.payload, ...state.productItems];
            })
            .addCase(uploadProduct.rejected, (state, action) => {
                console.log(action);
                state.uploadProductStatus = "failed";
                state.uploadProductError = {
                    title: "Error!",
                    message: "Something went wrong.",
                };
                // message: action.payload || "Something went wrong!",
            });
    },
});

export const productsActions = productsSlice.actions;

export default productsSlice;
