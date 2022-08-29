import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    productItems: [],
    currentEdit: {},
};

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setProducts(state, action) {
            state.productItems = action.payload;
        },
    },
});

export const productsActions = productsSlice.actions;

export default productsSlice;
