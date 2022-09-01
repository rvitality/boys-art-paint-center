import React from "react";
import { Routes, Route } from "react-router-dom";

import Overview from "../../components/Overview/Overview.component";
import Brands from "../../components/Brands/Brands.component";
import Categories from "../../components/Categories/Categories.component";
import Products from "../../components/Products/Products.component";
import Orders from "../../components/Orders/Orders.component";
import Customers from "../../components/Customers/Customers.component";

import "./DataPreview.styles.scss";

const DataPreview = () => {
    return (
        <section className="data-preview">
            <Routes>
                <Route path="overview/*" element={<Overview />} />
                <Route path="brands/*" element={<Brands />} />
                <Route path="categories/*" element={<Categories />} />

                <Route path="products" element={<Products />} />

                <Route path="orders/*" element={<Orders />} />
                <Route path="customers/*" element={<Customers />} />
            </Routes>
        </section>
    );
};

export default DataPreview;
