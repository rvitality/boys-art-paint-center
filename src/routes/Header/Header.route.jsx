import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../store/auth-context";

import { signOutUser } from "../../utils/firebase/firebase.utils";

import { FaUserCircle } from "react-icons/fa";
import { BiChevronDown } from "react-icons/bi";

import "./Header.styles.scss";

const Header = () => {
    const [showDropdown, setShowDropdown] = useState(false);

    const authContext = useAuthContext();

    const userName = authContext.user?.firstName;
    const userEmail = authContext.user?.email.split("@")[0]?.toLowerCase();

    const navigate = useNavigate();

    const logoutHandler = () => {
        // authCtx.logout();
        signOutUser();
        navigate("/boys-art-paint-center-delivery/auth");
        authContext.logout();
    };

    const toggleDropdownHandler = () => {
        setShowDropdown(prevState => !prevState);
    };

    return (
        <>
            <header className="header">
                <div className="greeting">
                    <p className="greeting__msg">
                        Hello, <span className="greeting__name">{userName}</span>. Welcome back!
                    </p>
                </div>

                <div className="user">
                    <FaUserCircle className="user__icon" />
                    <div className="user__name">{userEmail}</div>
                    <BiChevronDown
                        className="user__dropdown-icon"
                        onClick={toggleDropdownHandler}
                    />

                    <div className={`dropdown ${showDropdown ? "show" : ""}`}>
                        <Link to="">Profile</Link>
                        <Link to="">Settings</Link>
                        <Link to="">Help</Link>
                        <Link className="logout" to="" onClick={logoutHandler}>
                            Log out
                        </Link>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
