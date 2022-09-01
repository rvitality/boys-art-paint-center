import { productsActions } from "./products-slice";

import { getProductDocuments, uploadNewProduct } from "../../utils/firebase/firebase.utils";

export const fetchProductsData = () => {
    return async dispatch => {
        let products;

        try {
            dispatch(productsActions.fetchProductsStart());
            products = await getProductDocuments("cities");
        } catch (err) {
            dispatch(
                productsActions.fetchProductsFailed({
                    status: "error",
                    title: "Error!",
                    message: err.message,
                })
            );

            // Bail out early on failure
            return;
        }

        //  there's no error. Dispatch "fulfilled".
        if (products) {
            dispatch(productsActions.fetchProductsSuccess(products));
        }
    };
};

export const addNewProduct = (product, imgFileInput) => {
    return async dispatch => {
        try {
            // dispatch(
            //     uiActions.showStatus({
            //         status: "pending",
            //         title: "Sending...",
            //         message: "Please wait...",
            //     })
            // );

            const res = await uploadNewProduct(product, imgFileInput);
            if (res.id) {
                // dispatch(
                //     uiActions.showStatus({
                //         status: "success",
                //         title: "Success",
                //         message: "Product has been added successfully.",
                //     })
                // );
            }
        } catch (err) {
            // dispatch(
            //     uiActions.showStatus({
            //         status: "error",
            //         title: "Error!",
            //         message: err.message,
            //     })
            // );
        }

        // uploadNewProduct(product, imgFileInput).then(res => {
        //     // setResponseID(res?.id);
        //     // setIsLoading(false);
        // });
    };
};
