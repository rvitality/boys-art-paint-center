import { createSelector } from "@reduxjs/toolkit";

export const selectProductsData = state => {
    return state.products;
};

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
