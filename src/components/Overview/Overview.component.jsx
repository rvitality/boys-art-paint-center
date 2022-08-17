import React from "react";

import { BsCart4 } from "react-icons/bs";
import { MdOutlineAttachMoney } from "react-icons/md";
import { MdPeopleAlt } from "react-icons/md";
import { GiPaintRoller } from "react-icons/gi";

import "./Overview.styles.scss";

const Overview = () => {
    return (
        <article className="overview">
            <h2>Overview</h2>

            <div className="overview__header">
                <div className="card">
                    <div className="card__icon-container">
                        <BsCart4 className="card__icon" />
                    </div>
                    <div className="card__texts">
                        <span className="card__value">15, 500</span>
                        <span className="card__label">Total Orders</span>
                    </div>
                </div>

                <div className="card">
                    <div className="card__icon-container sales">
                        <MdOutlineAttachMoney className="card__icon" />
                    </div>
                    <div className="card__texts">
                        <span className="card__value">15, 500</span>
                        <span className="card__label">Total Sales</span>
                    </div>
                </div>

                <div className="card ">
                    <div className="card__icon-container customers">
                        <MdPeopleAlt className="card__icon" />
                    </div>
                    <div className="card__texts">
                        <span className="card__value">15, 500</span>
                        <span className="card__label">Total Customers</span>
                    </div>
                </div>

                <div className="card">
                    <div className="card__icon-container products">
                        <GiPaintRoller className="card__icon" />
                    </div>
                    <div className="card__texts">
                        <span className="card__value">15, 500</span>
                        <span className="card__label">Total Products</span>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default Overview;
