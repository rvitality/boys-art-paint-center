import React, { useEffect, useState } from "react";

import SortAbleTableHeader from "../../SortAbleTableHeader/SortAbleTableHeader.component";

import { TiEdit } from "react-icons/ti";
import { MdDelete } from "react-icons/md";

import "./ProductsTable.styles.scss";
import { useDispatch } from "react-redux";
import { setProductEdit } from "../../../store/products/products-actions";

const ProductsTable = ({ dataToDisplay: productsToDisplay }) => {
    const dispatch = useDispatch();

    const [products, setProducts] = useState([]);

    useEffect(() => {
        setProducts(productsToDisplay);
    }, [productsToDisplay]);

    const sortHandler = sortedData => setProducts(sortedData);

    const updateProductHandler = product => {
        dispatch(setProductEdit(product));
    };

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

                    <th>Action</th>
                </tr>
            </thead>

            <tbody>
                {products?.map((product, index) => {
                    // console.log(product.created.toDate());

                    const {
                        id,
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
                        <tr key={id}>
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
                            <td className="volume">
                                {volumeValue} {volume}
                            </td>
                            <td className="quantity__value">{currentQuantity}</td>
                            <td>
                                <div className="actions">
                                    <a
                                        href="#new-product"
                                        onClick={updateProductHandler.bind(null, product)}
                                        title="Edit"
                                        className="actions__edit"
                                    >
                                        <TiEdit />
                                    </a>
                                    <a href="#" title="Delete" className="actions__del">
                                        <MdDelete />
                                    </a>
                                </div>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default ProductsTable;
