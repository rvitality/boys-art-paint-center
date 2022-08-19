import React, { useEffect, useState } from "react";

import { getDataAndDocuments } from "../../utils/firebase/firebase.utils";

import { useInfoContext } from "../../store/info-context";

import Spinner from "../../UI/Spinner/Spinner.component";

import { BiSearchAlt2 } from "react-icons/bi";
import { HiOutlineChevronDoubleLeft } from "react-icons/hi";
import { HiOutlineChevronRight } from "react-icons/hi";

import "./Products.styles.scss";
import ProductsTable from "../ProductsTable/ProductsTable.component";

const chunkArray = (arr, chunk = 10) => {
    const arrCopy = [...arr];
    const res = [];

    while (arrCopy.length > 0) {
        res.push(arrCopy.splice(0, chunk));
    }

    return res;
};

const setPageArrayInitialState = data => {
    return Array(data.length > 5 ? 5 : data.length)
        .fill(0)
        .map((_, index) => index + 1);
};

const Products = () => {
    const { products } = useInfoContext();

    const [dividedProducts, setDividedProducts] = useState([]);

    const [productsToDisplay, setProductsToDisplay] = useState(dividedProducts[0] || []);

    const [paginationArray, setPaginationArray] = useState([]);
    const [paginationSetIndex, setPaginationSetIndex] = useState(1);

    const [currentPageIndex, setCurrentPageIndex] = useState(1);

    const fivePagesCount = Math.floor(dividedProducts.length / 5);
    const remainderPagesCount = dividedProducts.length % 5;

    const showNextButton = paginationSetIndex <= fivePagesCount;

    const changePageHandler = index => {
        setCurrentPageIndex(index);
        setProductsToDisplay(dividedProducts[index - 1]);
    };

    const backToFirstSetButtonsHandler = () => {
        setPaginationArray(setPageArrayInitialState(dividedProducts));

        setCurrentPageIndex(1);
        setPaginationSetIndex(1);
        setProductsToDisplay(dividedProducts[0]);
    };

    const nextSetButtonsHandler = () => {
        let pageSetCount;

        if (fivePagesCount === paginationSetIndex) {
            pageSetCount = remainderPagesCount;
        } else {
            pageSetCount = 5;
        }

        const mappedPaginationArr = Array(pageSetCount)
            .fill(0)
            .map((num, index) => {
                return paginationSetIndex * 5 + (index + 1);
            });

        setPaginationArray(mappedPaginationArr);
        setCurrentPageIndex(paginationSetIndex * 5 + 1);
        setProductsToDisplay(dividedProducts[paginationSetIndex * 5]);
        setPaginationSetIndex(prevState => prevState + 1);
    };

    const paginationButtons = paginationArray.map(num => {
        return (
            <button
                className={`${currentPageIndex === num ? "active" : ""}`}
                key={num}
                onClick={() => changePageHandler(num)}
            >
                {num}
            </button>
        );
    });

    const searchChangeHandler = e => {
        const inputValue = e.target.value.trim().toLowerCase();

        const filtered = dividedProducts[currentPageIndex - 1].filter(product => {
            const { name, color, type } = product;

            return (
                name.toLowerCase().includes(inputValue) ||
                color.toLowerCase().includes(inputValue) ||
                type.toLowerCase().includes(inputValue)
            );
        });

        setProductsToDisplay(filtered);
    };

    const setInitialStates = data => {
        const chunkData = chunkArray(data, 10);
        setDividedProducts(chunkData);

        setPaginationArray(setPageArrayInitialState(chunkData));

        setProductsToDisplay(chunkData[0]);
    };

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await getDataAndDocuments("products");
            products.setProducts(res);
            setInitialStates(res);
        };

        if (products.data.length === 0) {
            fetchProducts();
        } else {
            const productsCopy = [...products.data];
            setInitialStates(productsCopy);
        }
    }, [products]);

    return (
        <article className="products">
            <h2>Products</h2>

            <div className="filter">
                <div className="filter__search">
                    <BiSearchAlt2 />
                    <input
                        type="text"
                        placeholder="Filter by name, color or type"
                        onChange={searchChangeHandler}
                    />
                </div>
            </div>

            {productsToDisplay.length === 0 ? (
                <Spinner />
            ) : (
                <ProductsTable productsToDisplay={productsToDisplay} />
            )}

            <div className="pagination">
                {productsToDisplay.length > 0 && (
                    <>
                        {paginationSetIndex > 1 && (
                            <button onClick={backToFirstSetButtonsHandler}>
                                <HiOutlineChevronDoubleLeft />
                            </button>
                        )}
                        {paginationButtons}
                        {showNextButton && (
                            <button onClick={nextSetButtonsHandler}>
                                <HiOutlineChevronRight />
                            </button>
                        )}
                    </>
                )}
            </div>
        </article>
    );
};

export default Products;
