import { createSelector } from "@reduxjs/toolkit";

export const selectProductsData = state => {
    return state.products;
};

// ! FETCH PRODUCTS ---------------------------------------

export const selectProductItems = createSelector(
    [selectProductsData],
    productsSlice => productsSlice.productItems
);

export const selectFetchProductStatus = createSelector(
    [selectProductsData],
    productsSlice => productsSlice.fetchProductsStatus
);

export const selectFetchProductError = createSelector(
    [selectProductsData],
    productsSlice => productsSlice.fetchProductsError
);

// ! UPLOAD NEW PRODUCT ---------------------------------------
export const selectUploadProductStatus = createSelector(
    [selectProductsData],
    productsSlice => productsSlice.uploadProductStatus
);

export const selectUploadProductError = createSelector(
    [selectProductsData],
    productsSlice => productsSlice.uploadProductError
);

// ! EDIT PRODUCT ---------------------------------------
export const selectCurrentEdit = state => state.products.currentEdit;
