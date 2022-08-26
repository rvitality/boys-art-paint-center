import React, { useEffect, useState } from "react";

import { getDataAndDocuments } from "../../utils/firebase/firebase.utils";
import { useInfoContext } from "../../store/info-context";

import DataTable from "../DataTable/DataTable.component";
import ProductsTable from "./ProductsTable/ProductsTable.component";

// import "./Products.styles.scss";

const Products = () => {
    const { products } = useInfoContext();
    const [isLoading, setIsLoading] = useState(false);

    const filterBySearchHandler = (data, inputValue) => {
        if (!data) return;

        return data.filter(product => {
            const { name, color, type } = product;
            return (
                name.toLowerCase().includes(inputValue) ||
                color.toLowerCase().includes(inputValue) ||
                type.toLowerCase().includes(inputValue)
            );
        });
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                const res = await getDataAndDocuments("products");
                products.setProducts(res);
            } catch (err) {
                console.log(err.message);
            }

            setIsLoading(false);
        };

        if (products.data.length === 0) {
            fetchProducts();
        }
    }, [products]);

    return (
        <DataTable
            categoryName="Products"
            fetchedData={products}
            onFilterBySearch={filterBySearchHandler}
            isLoading={isLoading}
            Table={ProductsTable}
        />
    );
};

export default Products;