import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts, uploadProduct, updateProduct, deleteProduct } from "./products-actions";

const initialState = {
    productItems: [],
    currentEdit: {},

    fetchProductsStatus: "idle",
    fetchProductsError: {},

    uploadProductStatus: "idle",
    uploadProductError: {},

    updateProductStatus: "idle",
    updateProductError: {},

    deleteProductStatus: "idle",
    deleteProductError: {},
};

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setCurrentEdit(state, action) {
            state.currentEdit = action.payload;
        },
        resetUploadProductStatus(state, action) {
            state.uploadProductStatus = "idle";
        },
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
                state.uploadProductStatus = "failed";
                state.uploadProductError = {
                    title: "Error!",
                    message: "Something went wrong.",
                };
                // message: action.payload || "Something went wrong!",
            })

            .addCase(updateProduct.pending, (state, action) => {
                state.updateProductStatus = "loading";
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.updateProductStatus = "succeeded";

                const updatedProduct = action.payload;
                console.log(updatedProduct);

                state.productItems = state.productItems.map(product => {
                    if (product.id === updatedProduct.id) {
                        return { ...product, ...updatedProduct };
                    }

                    return product;
                });
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.updateProductStatus = "failed";
                state.updateProductError = {
                    title: "Error!",
                    message: "Something went wrong.",
                };
                // message: action.payload || "Something went wrong!",
            })

            .addCase(deleteProduct.pending, (state, action) => {
                state.deleteProductStatus = "loading";
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.deleteProductStatus = "succeeded";

                const deleteProduct = action.payload;

                state.productItems = state.productItems.filter(product => {
                    return product.id !== deleteProduct.id;
                });
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.deleteProductStatus = "failed";
                state.deleteProductError = {
                    title: "Error!",
                    message: "Something went wrong.",
                };
                // message: action.payload || "Something went wrong!",
            });
    },
});

export const productsActions = productsSlice.actions;

export default productsSlice;
