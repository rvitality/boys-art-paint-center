import React from "react";

import { Link, Outlet } from "react-router-dom";

import "./Navigation.styles.scss";

const Navigation = () => {
    return (
        <>
            <aside className="sidebar">
                <div className="logo">
                    <Link to="/">LOGO</Link>
                </div>
                <nav className="sidebar__nav">
                    <ul>
                        <li>
                            <Link to="brands">Brands</Link>
                        </li>
                        <li>
                            <Link to="categories">Categories</Link>
                        </li>
                        <li>
                            <Link to="products">Products</Link>
                        </li>
                        <li>
                            <Link to="orders">Orders</Link>
                        </li>
                    </ul>
                </nav>
            </aside>
            <Outlet />
        </>
    );
};

export default Navigation;
