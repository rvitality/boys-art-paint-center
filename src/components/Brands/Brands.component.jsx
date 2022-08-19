import React, { useEffect } from "react";
import { useInfoContext } from "../../store/info-context";

import { getDataAndDocuments } from "../../utils/firebase/firebase.utils";

const Brands = () => {
    const { brands } = useInfoContext();

    useEffect(() => {
        const fetchBrands = async () => {
            const res = await getDataAndDocuments("brands");
            brands.setBrands(res);
        };

        if (brands.data.length === 0) {
            console.log("fetch");

            fetchBrands();
        }
    }, [brands]);
    return (
        <article className="brands">
            <h2>Brands</h2>
            <br />
            <hr />
            <br />
            <ul>
                {brands.data.map((brand, index) => (
                    <li key={`${brand}_${index}`}>{brand.brandName}</li>
                ))}
            </ul>
        </article>
    );
};

export default Brands;
