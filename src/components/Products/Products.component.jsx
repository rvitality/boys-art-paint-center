import React, { useState, useEffect } from "react";

import { getDataAndDocuments } from "../../utils/firebase/firebase.utils";

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await getDataAndDocuments("products");
            setProducts(res);
        };

        fetchData();
    }, []);
    return (
        <div>
            <h2>Products</h2>
            <br />
            <hr />
            <br />
            {products.map((product, index) => (
                <div
                    style={{ border: "2px solid #000", padding: "2rem" }}
                    key={`${product}_${index}`}
                >
                    <h3> {product.brand}</h3>
                    <p>
                        <b>Name: </b> {product.name}
                    </p>
                    <p>
                        <b>Type: </b> {product.type}
                    </p>
                    <p>
                        <b>Volume: </b> {product.volumeValue} {product.volume}
                    </p>
                    <p>
                        <b>Color: </b> {product.color}
                    </p>
                    <p>
                        <b>Price: </b> {product.price}
                    </p>
                    <p>
                        <b>Quantity: </b> {product.currentQuantity}
                    </p>
                    <img
                        style={{ width: "100px", marginTop: "1rem" }}
                        src={product.imageUrl}
                        alt={product.name}
                    />
                </div>
            ))}
        </div>
    );
};

export default Products;
