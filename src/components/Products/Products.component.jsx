import React, { useEffect } from "react";

import { getDataAndDocuments } from "../../utils/firebase/firebase.utils";
import { useInfoContext } from "../../store/info-context";

import DataTable from "../DataTable/DataTable.component";
import ProductsTable from "./ProductsTable/ProductsTable.component";

// import "./Products.styles.scss";

const Products = () => {
    const { products } = useInfoContext();

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await getDataAndDocuments("products");
            products.setProducts(res);
        };

        if (products.data.length === 0) {
            fetchProducts();
        }
    }, [products]);

    return <DataTable name="Products" fetchedData={products} Table={ProductsTable} />;
};

export default Products;
