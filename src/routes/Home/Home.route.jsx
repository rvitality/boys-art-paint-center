import React from "react";
import { Routes, Route } from "react-router-dom";

import Brands from "../../components/Brands/Brands.component";
import Categories from "../../components/Categories/Categories.component";
import Products from "../../components/Products/Products.component";
import Orders from "../../components/Orders/Orders.component";

import Navigation from "../../components/Navigation/Navigation.component";

import "./Home.styles.scss";

const Home = () => {
    return (
        <div className="home">
            <Navigation />
            <div className="home__results">
                <Routes>
                    <Route path="brands" element={<Brands />} />
                    <Route path="categories" element={<Categories />} />
                    <Route path="products" element={<Products />} />
                    <Route path="orders" element={<Orders />} />
                </Routes>
            </div>
        </div>
    );
};

export default Home;
