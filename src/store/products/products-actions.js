import { productsActions } from "./products-slice";
import { getProductDocuments } from "../../utils/firebase/firebase.utils";

export const fetchProductsData = () => {
    return async dispatch => {
        try {
            // setIsLoading(true);
            const products = await getProductDocuments("cities");
            dispatch(productsActions.setProducts(products));
        } catch (err) {
            console.log(err.message);
        }

        // setIsLoading(false);
    };
};
