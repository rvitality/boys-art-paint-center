import React from "react";
import { Link } from "react-router-dom";

import { GoPaintcan } from "react-icons/go";

import "./Logo.styles.scss";

const Logo = () => {
    return (
        <h1 className="logo">
            <Link className="logo__link" to="/boys-art-paint-center-delivery/overview">
                <GoPaintcan className="logo__icon" />
                <span className="logo__value">
                    Boys Art <br />
                    Enterprises
                </span>
            </Link>
        </h1>
    );
};

export default Logo;
