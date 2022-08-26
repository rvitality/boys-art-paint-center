import React, { useEffect, useState } from "react";

import SortAbleTableHeader from "../../SortAbleTableHeader/SortAbleTableHeader.component";

import "./ProductsTable.styles.scss";

const ProductsTable = ({ dataToDisplay: productsToDisplay }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setProducts(productsToDisplay);
    }, [productsToDisplay]);

    const sortHandler = sortedData => setProducts(sortedData);

    return (
        <table className="products-table">
            <thead>
                <tr>
                    <SortAbleTableHeader
                        dataArr={productsToDisplay}
                        onSort={sortHandler}
                        typeToSort="brand"
                    >
                        Brand
                    </SortAbleTableHeader>

                    <th>Image</th>

                    <SortAbleTableHeader
                        dataArr={productsToDisplay}
                        className="span-2"
                        onSort={sortHandler}
                        typeToSort="name"
                    >
                        Name
                    </SortAbleTableHeader>

                    <SortAbleTableHeader
                        dataArr={productsToDisplay}
                        onSort={sortHandler}
                        typeToSort="color"
                    >
                        Color
                    </SortAbleTableHeader>

                    <SortAbleTableHeader
                        dataArr={productsToDisplay}
                        onSort={sortHandler}
                        typeToSort="type"
                    >
                        Type
                    </SortAbleTableHeader>

                    <SortAbleTableHeader
                        dataArr={productsToDisplay}
                        onSort={sortHandler}
                        typeToSort="price"
                    >
                        Price
                    </SortAbleTableHeader>

                    <th>Volume</th>

                    <SortAbleTableHeader
                        dataArr={productsToDisplay}
                        onSort={sortHandler}
                        typeToSort="currentQuantity"
                    >
                        Stock
                    </SortAbleTableHeader>

                    <th></th>
                </tr>
            </thead>

            <tbody>
                {products?.map((product, index) => {
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
                            {/* <td>#{Math.round(Math.random() * 1000)}</td> */}
                            <td>{brand}</td>
                            <td>
                                <img className="products__img" src={imageUrl} alt={name} />
                            </td>
                            <td className="span-2 bold">{name}</td>
                            <td>{color}</td>
                            <td>{type}</td>
                            <td className="bold">
                                ₱
                                {Math.round(price).toLocaleString("en-US", {
                                    minimumFractionDigits: 2,
                                })}
                            </td>
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
    );
};

export default ProductsTable;
