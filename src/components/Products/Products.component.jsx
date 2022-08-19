import React, { useEffect, useState } from "react";

import { getDataAndDocuments } from "../../utils/firebase/firebase.utils";

import { useInfoContext } from "../../store/info-context";

import { BiSearchAlt2 } from "react-icons/bi";

import "./Products.styles.scss";

const chunkArray = (arr, chunk = 10) => {
    const arrCopy = [...arr];
    const res = [];

    while (arrCopy.length > 0) {
        res.push(arrCopy.splice(0, chunk));
    }

    return res;
};

const Products = () => {
    const { products } = useInfoContext();

    const [dividedProducts, setDividedProducts] = useState(products.data || []);
    const [currentPageIndex, setCurrentPageIndex] = useState(1);

    const [productsToDisplay, setProductsToDisplay] = useState(dividedProducts[0] || []);

    // const [currentPageArray, setCurrentPageArray] = useState(arr[0] || []);
    const [paginationSetIndex, setPaginationSetIndex] = useState(1);

    const [paginationArray, setPaginationArray] = useState([]);

    const fivePagesCount = Math.floor(dividedProducts.length / 5);
    const remainderPagesCount = dividedProducts.length % 5;

    const showNextButton = paginationSetIndex <= fivePagesCount;

    const changePageHandler = index => {
        setCurrentPageIndex(index);
        setProductsToDisplay(dividedProducts[index - 1]);
    };

    const paginationButtons = paginationArray.map(num => {
        return (
            <button
                style={{
                    cursor: "pointer",
                    padding: "1rem",
                    backgroundColor: `${currentPageIndex === num ? "yellow" : ""}`,
                }}
                key={num}
                onClick={() => changePageHandler(num)}
            >
                {num}
            </button>
        );
    });

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

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await getDataAndDocuments("products");
            products.setProducts(res);

            const resCopy = [...res];
            const chunkData = chunkArray(resCopy, 10);
            setDividedProducts(chunkData);

            setPaginationArray(
                Array(chunkData.length > 5 ? 5 : chunkData.length)
                    .fill(0)
                    .map((_, index) => index + 1)
            );

            setProductsToDisplay(chunkData[0]);
        };

        if (products.data.length === 0) {
            fetchProducts();
        }
    }, [products]);

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

        // setFilteredProducts(filtered);
    };

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

            <table className="products__table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Brand</th>
                        <th>Image</th>
                        <th className="span-2">Name</th>
                        <th>Color</th>
                        <th>Type</th>
                        <th>Price</th>
                        <th>Volume</th>
                        <th className="quantity quantity__heading">Quantity</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {productsToDisplay.map((product, index) => {
                        const {
                            brand,
                            imageUrl,
                            name,
                            color,
                            type,
                            price,
                            volume,
                            volumeValue,
                            currentQuantity,
                        } = product;

                        return (
                            <tr key={`${name}_${index}`}>
                                <td>#{index}</td>
                                <td>{brand}</td>
                                <td>
                                    <img className="products__img" src={imageUrl} alt={name} />
                                </td>
                                <td className="span-2">{name}</td>
                                <td>{color}</td>
                                <td>{type}</td>
                                <td>{price}</td>
                                <td>
                                    {volumeValue} {volume}
                                </td>
                                <td className="quantity__value">{currentQuantity}</td>
                                <td>
                                    <span>Edit</span>
                                    <span>Delete</span>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <div className="pagination">
                {dividedProducts && (
                    <>
                        {paginationButtons}
                        {showNextButton && <button onClick={nextSetButtonsHandler}>Next</button>}
                    </>
                )}
            </div>
        </article>
    );
};

export default Products;
