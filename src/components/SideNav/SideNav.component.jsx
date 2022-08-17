import React from "react";

import { Link } from "react-router-dom";

import { DiGhostSmall } from "react-icons/di";
import { MdOutlinePeople } from "react-icons/md";
import { GiLargePaintBrush } from "react-icons/gi";
import { GoPackage } from "react-icons/go";
import { BiCategoryAlt } from "react-icons/bi";
import { VscPaintcan } from "react-icons/vsc";
import { GoPaintcan } from "react-icons/go";

import "./SideNav.styles.scss";

const SideNav = () => {
    return (
        <>
            <aside className="sidebar">
                <h1 className="logo">
                    <Link className="logo__link" to="/boys-art-paint-center-delivery">
                        <GoPaintcan className="logo__icon" />
                        <span className="logo__value">
                            Boys Art <br />
                            Enterprises
                        </span>
                    </Link>
                </h1>
                <nav className="sidebar__nav nav">
                    <ul>
                        <li>
                            <Link className="nav__link" to="overview">
                                <DiGhostSmall className="nav__link-icon" />
                                <span className="nav__link-value">Overview</span>
                            </Link>
                        </li>

                        <li>
                            <Link className="nav__link" to="brands">
                                <VscPaintcan className="nav__link-icon" />
                                <span className="nav__link-value">Brands</span>
                            </Link>
                        </li>

                        <li>
                            <Link className="nav__link" to="categories">
                                <BiCategoryAlt className="nav__link-icon" />
                                <span className="nav__link-value">Categories</span>
                            </Link>
                        </li>

                        <li>
                            <Link className="nav__link" to="products">
                                <GiLargePaintBrush className="nav__link-icon" />
                                <span className="nav__link-value">Products</span>
                            </Link>
                        </li>

                        <li>
                            <Link className="nav__link" to="orders">
                                <GoPackage className="nav__link-icon" />
                                <span className="nav__link-value">Orders</span>
                            </Link>
                        </li>

                        <li>
                            <Link className="nav__link" to="customers">
                                <MdOutlinePeople className="nav__link-icon" />
                                <span className="nav__link-value">Customers</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </aside>
        </>
    );
};

export default SideNav;
