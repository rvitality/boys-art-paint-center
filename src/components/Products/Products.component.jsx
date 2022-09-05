import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchProducts, setProductEdit } from "../../store/products/products-actions";
import {
    selectProductItems,
    selectFetchProductStatus,
    selectFetchProductError,
    selectCurrentEdit,
} from "../../store/products/products-selector";

import DataTable from "../DataTable/DataTable.component";
import ProductsTable from "./ProductsTable/ProductsTable.component";
import NewProduct from "./NewProduct/NewProduct.component";
import Error from "../Error/Error.component";

import "./Products.styles.scss";
import Spinner from "../../UI/Spinner/Spinner.component";

const Products = () => {
    const dispatch = useDispatch();

    const [showNewItemForm, setShowNewItemForm] = useState(false);

    const productItems = useSelector(selectProductItems);
    const productsStatus = useSelector(selectFetchProductStatus);
    const productsError = useSelector(selectFetchProductError);

    console.log("PRODUCTS: ", productItems);

    const currentProductEdit = useSelector(selectCurrentEdit);
    const currentProductEditExists = Object.keys(currentProductEdit).length > 0;

    const hasError = productsStatus === "failed";
    const productsIsLoading = productsStatus === "loading";

    useEffect(() => {
        if (productsStatus === "idle") {
            dispatch(fetchProducts());
        }
    }, [productsStatus, dispatch]);

    const filterBySearchHandler = (data, inputValue) => {
        if (!data) return;

        return data.filter(product => {
            const { brand, name, color, type, volume } = product;
            return (
                brand.toLowerCase().includes(inputValue) ||
                name.toLowerCase().includes(inputValue) ||
                color.toLowerCase().includes(inputValue) ||
                type.toLowerCase().includes(inputValue) ||
                volume.toLowerCase().includes(inputValue)
            );
        });
    };

    let mainContent;

    if (hasError) {
        mainContent = <Error {...productsError} />;
    } else if (productsIsLoading) {
        mainContent = <Spinner />;
    } else {
        mainContent = (
            <DataTable
                categoryName="Products"
                fetchedData={productItems}
                onFilterBySearch={filterBySearchHandler}
                Table={ProductsTable}
            />
        );
    }

    return (
        <>
            {(showNewItemForm || currentProductEditExists) && (
                <NewProduct
                    onHide={() => {
                        dispatch(setProductEdit({}));
                        setShowNewItemForm(false);
                    }}
                />
            )}

            <div className="add-item-btn-container">
                {!showNewItemForm && !currentProductEditExists ? (
                    <button
                        onClick={() => {
                            setShowNewItemForm(true);
                        }}
                        className="add-item-btn-container__btn"
                    >
                        Add New
                    </button>
                ) : (
                    ""
                )}
            </div>

            {mainContent}
        </>
    );
};

export default Products;
