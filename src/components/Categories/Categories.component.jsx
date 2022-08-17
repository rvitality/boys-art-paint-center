import React, { useState, useEffect } from "react";

import { getDataAndDocuments } from "../../utils/firebase/firebase.utils";

const Categories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await getDataAndDocuments("categories");
            setCategories(res);
        };

        fetchData();
    }, []);
    return (
        <div>
            <h2>Categories</h2>
            <br />
            <hr />
            <br />
            <ul>
                {categories.map((category, index) => (
                    <li key={`${category}_${index}`}>{category.categoryName}</li>
                ))}
            </ul>
        </div>
    );
};

export default Categories;
