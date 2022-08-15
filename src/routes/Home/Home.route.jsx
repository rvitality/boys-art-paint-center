import React from "react";
import { Routes, Route } from "react-router-dom";

import Brands from "../../components/Brands/Brands.component";
import Categories from "../../components/Categories/Categories.component";
import Products from "../../components/Products/Products.component";
import Orders from "../../components/Orders/Orders.component";

import "./Home.styles.css";

const Home = () => {
    return (
        <div className="home">
            <Routes>
                <Route path="brands" element={<Brands />} />
                <Route path="categories" element={<Categories />} />
                <Route path="products" element={<Products />} />
                <Route path="orders" element={<Orders />} />
            </Routes>
        </div>
    );
};

export default Home;
