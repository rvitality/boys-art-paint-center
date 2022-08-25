import React from "react";

import "./ProductsTable.styles.scss";

const ProductsTable = ({ productsToDisplay }) => {
    return (
        <table className="products-table">
            <thead>
                <tr>
                    {/* <th>ID</th> */}
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
                {productsToDisplay?.map((product, index) => {
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
    );
};

export default ProductsTable;
