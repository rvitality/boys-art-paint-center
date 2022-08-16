import React from "react";

import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../store/auth-context";

import { signOutUser } from "../../utils/firebase/firebase.utils";

import "./Header.styles.scss";

const Header = () => {
    const authContext = useAuthContext();

    const navigate = useNavigate();

    const logoutHandler = () => {
        // authCtx.logout();
        signOutUser();
        navigate("/boys-art-paint-center-delivery/auth");
        authContext.logout();
    };

    return (
        <>
            <header className="header">
                <Link to="/boys-art-paint-center-delivery">
                    <div className="header__logo">LOGO</div>
                </Link>
                <nav className="header__nav">
                    <ul>
                        {!authContext.isLoggedIn && (
                            <li>
                                <Link to="/boys-art-paint-center-delivery/auth">Login</Link>
                            </li>
                        )}

                        {authContext.isLoggedIn && (
                            <li>
                                <Link to="/boys-art-paint-center-delivery">Profile</Link>
                            </li>
                        )}

                        {authContext.isLoggedIn && (
                            <li>
                                <button className="logout-btn" onClick={logoutHandler}>
                                    Log Out
                                </button>
                            </li>
                        )}
                    </ul>
                </nav>
            </header>
        </>
    );
};

export default Header;
