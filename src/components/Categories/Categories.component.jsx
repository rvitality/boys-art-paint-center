import React, { useState, useEffect } from "react";

import { getDataAndDocuments } from "../../utils/firebase/firebase.utils";

import { useInfoContext } from "../../store/info-context";

const Categories = () => {
    const { categories } = useInfoContext();

    useEffect(() => {
        const fetchCategories = async () => {
            const res = await getDataAndDocuments("categories");
            categories.setCategories(res);
        };

        if (categories.data.length === 0) {
            fetchCategories();
        }
    }, [categories]);
    return (
        <article className="categories">
            <h2>Categories</h2>
            <br />
            <hr />
            <br />
            <ul>
                {categories.data.map((category, index) => (
                    <li key={`${category}_${index}`}>{category.categoryName}</li>
                ))}
            </ul>
        </article>
    );
};

export default Categories;
