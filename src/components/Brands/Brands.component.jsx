import React, { useState, useEffect } from "react";

import { getDataAndDocuments } from "../../utils/firebase/firebase.utils";

const Brands = () => {
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        const fetchBrands = async () => {
            const res = await getDataAndDocuments("brands");
            setBrands(res);
        };

        fetchBrands();
    }, []);
    return (
        <div>
            <h2>Brands</h2>
            <br />
            <hr />
            <br />
            <ul>
                {brands.map((brand, index) => (
                    <li key={`${brand}_${index}`}>{brand.brandName}</li>
                ))}
            </ul>
        </div>
    );
};

export default Brands;
