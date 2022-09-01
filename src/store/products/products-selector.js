import { createSelector } from "@reduxjs/toolkit";

export const selectProductsData = state => {
    // console.log("selector 1 fired: ", state);
    return state.products;
};

export const selectProductItems = createSelector(
    [selectProductsData],
    productsSlice => productsSlice.productItems
);

export const selectProductsIsLoading = createSelector(
    [selectProductsData],
    productsSlice => productsSlice.isLoading
);

export const selectProductsError = createSelector(
    [selectProductsData],
    productsSlice => productsSlice.error
);

// ! ----------------------
// try
// export const selectEditProductItem = (state, editProductID) => {
//     return state.products.productItems.find(item => item.id === editProductID);
// };
