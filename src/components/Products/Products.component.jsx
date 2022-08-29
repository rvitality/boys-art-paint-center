import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchProductsData } from "../../store/products/products-actions";

import DataTable from "../DataTable/DataTable.component";
import ProductsTable from "./ProductsTable/ProductsTable.component";
import NewProduct from "../NewProduct/NewProduct.component";

import "./Products.styles.scss";

const Products = () => {
    const [showNewItemForm, setShowNewItemForm] = useState(false);

    const products = useSelector(state => state.products.productItems);
    console.log(products);

    const dispatch = useDispatch();

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

    useEffect(() => {
        if (products.length === 0) {
            dispatch(fetchProductsData());
        }
    }, [products.length, dispatch]);

    return (
        <>
            <NewProduct
                showNewItemForm={showNewItemForm}
                onHide={() => setShowNewItemForm(false)}
            />

            <div className={`add-item-btn-container ${showNewItemForm ? "hide" : ""}`}>
                <button
                    onClick={() => {
                        setShowNewItemForm(true);
                    }}
                    className="add-item-btn-container__btn"
                >
                    Add New
                </button>
            </div>

            <DataTable
                categoryName="Products"
                fetchedData={products}
                onFilterBySearch={filterBySearchHandler}
                isLoading={isLoading}
                Table={ProductsTable}
            />
        </>
    );
};

export default Products;
