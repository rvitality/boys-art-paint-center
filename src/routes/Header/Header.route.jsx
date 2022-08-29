import React from "react";
import Nav from "../../components/Nav/Nav.component";
import Logo from "../../components/Logo/Logo.component";

import "./Header.styles.scss";
import User from "../../components/User/User.component";

const Header = () => {
    return (
        <>
            <header className="header">
                <div className="header__upper-part">
                    <Logo />
                    <User />
                </div>

                <Nav />
            </header>
        </>
    );
};

export default Header;
