import React, { useEffect, useState } from "react";

import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../../utils/firebase/firebase.utils";

// import { getDataAndDocuments } from "../../utils/firebase/firebase.utils";
import { useInfoContext } from "../../store/info-context";

import DataTable from "../DataTable/DataTable.component";
import ProductsTable from "./ProductsTable/ProductsTable.component";
import NewProduct from "../NewProduct/NewProduct.component";

// import "./Products.styles.scss";

const Products = () => {
    console.log("products");

    const { products } = useInfoContext();

    const [isLoading, setIsLoading] = useState(false);

    const filterBySearchHandler = (data, inputValue) => {
        if (!data) return;

        return data.filter(product => {
            const { name, color, type, volume } = product;
            return (
                name.toLowerCase().includes(inputValue) ||
                color.toLowerCase().includes(inputValue) ||
                type.toLowerCase().includes(inputValue) ||
                volume.toLowerCase().includes(inputValue)
            );
        });
    };

    // useEffect(() => {
    //     const fetchProducts = async () => {
    //         try {
    //             setIsLoading(true);
    //             const res = await getDataAndDocuments("cities");
    //             if (res.length > 0) {
    //                 products.setProducts(res);
    //             }
    //         } catch (err) {
    //             console.log(err.message);
    //         }

    //         setIsLoading(false);
    //     };

    //     if (products.data.length === 0) {
    //         fetchProducts();
    //     }
    // }, [products]);

    useEffect(() => {
        setIsLoading(true);

        const citiesRef = collection(db, "cities");
        const queryRequest = query(citiesRef, orderBy("created", "desc"));

        const unsubscribe = onSnapshot(
            queryRequest,
            snapshot => {
                const fetchedProducts = snapshot.docs?.map(docSnapshot => docSnapshot.data());
                products.setProducts(fetchedProducts);
                setIsLoading(false);
            },
            error => {
                console.log(error);
            }
        );

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <DataTable
            categoryName="Products"
            fetchedData={products}
            onFilterBySearch={filterBySearchHandler}
            isLoading={isLoading}
            NewItemForm={NewProduct}
            Table={ProductsTable}
        />
    );
};

export default Products;
