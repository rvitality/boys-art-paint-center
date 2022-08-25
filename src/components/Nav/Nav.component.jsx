import React from "react";

import { Link, useLocation } from "react-router-dom";

import { DiGhostSmall } from "react-icons/di";
import { MdOutlinePeople } from "react-icons/md";
import { GiLargePaintBrush } from "react-icons/gi";
import { GoPackage } from "react-icons/go";
import { BiCategoryAlt } from "react-icons/bi";
import { VscPaintcan } from "react-icons/vsc";

import "./Nav.styles.scss";

const Nav = () => {
    const location = useLocation();
    const path = location.pathname.split("/")?.[2];

    return (
        <>
            <div className="nav-container">
                <nav className="nav">
                    <ul>
                        <li>
                            <Link
                                className={`nav__link ${path === "overview" ? "active" : ""}`}
                                to="overview"
                            >
                                <DiGhostSmall className="nav__link-icon" />
                                <span className="nav__link-value">Overview</span>
                            </Link>
                        </li>

                        <li>
                            <Link
                                className={`nav__link ${path === "brands" ? "active" : ""}`}
                                to="brands"
                            >
                                <VscPaintcan className="nav__link-icon" />
                                <span className="nav__link-value">Brands</span>
                            </Link>
                        </li>

                        <li>
                            <Link
                                className={`nav__link ${path === "categories" ? "active" : ""}`}
                                to="categories"
                            >
                                <BiCategoryAlt className="nav__link-icon" />
                                <span className="nav__link-value">Categories</span>
                            </Link>
                        </li>

                        <li>
                            <Link
                                className={`nav__link ${path === "products" ? "active" : ""}`}
                                to="products"
                            >
                                <GiLargePaintBrush className="nav__link-icon" />
                                <span className="nav__link-value">Products</span>
                            </Link>
                        </li>

                        <li>
                            <Link
                                className={`nav__link ${path === "orders" ? "active" : ""}`}
                                to="orders"
                            >
                                <GoPackage className="nav__link-icon" />
                                <span className="nav__link-value">Orders</span>
                            </Link>
                        </li>

                        <li>
                            <Link
                                className={`nav__link ${path === "customers" ? "active" : ""}`}
                                to="customers"
                            >
                                <MdOutlinePeople className="nav__link-icon" />
                                <span className="nav__link-value">Customers</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
};

export default Nav;
