import React, { useEffect, useRef, useState } from "react";

import { Link, Navigate } from "react-router-dom";

import { signOutUser } from "../../utils/firebase/firebase.utils";
import { useAuthContext } from "../../store/auth-context";

import { FaUserCircle } from "react-icons/fa";
import { BiChevronDown } from "react-icons/bi";

import "./User.styles.scss";

const User = () => {
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);

    const [showDropdown, setShowDropdown] = useState(false);

    const authContext = useAuthContext();

    const userName = authContext.user?.firstName;
    const userEmail = authContext.user?.email.split("@")[0]?.toLowerCase();

    const toggleDropdownHandler = () => setShowDropdown(prevState => !prevState);

    const logoutHandler = () => {
        signOutUser();
        authContext.logout();
        Navigate("/boys-art-paint-center-delivery/auth");
    };

    useEffect(() => {
        const checkIfClickedOutside = e => {
            // If the menu is open and the clicked target is not within the menu, then close the menu

            if (showDropdown && dropdownRef.current && e.target !== buttonRef.current) {
                setShowDropdown(false);
            }
        };

        document.addEventListener("click", checkIfClickedOutside);

        return () => {
            // Cleanup the event listener
            document.removeEventListener("click", checkIfClickedOutside);
        };
    }, [showDropdown]);

    return (
        <div className="user-container">
            <div className="greeting">
                <p className="greeting__msg">
                    Hello, <span className="greeting__name">{userName}</span>. Welcome back!
                </p>
            </div>

            <div className="user">
                <FaUserCircle className="user__profile-icon" />
                <div className="user__name">{userEmail}</div>
                <button
                    className="user__drowndown-btn"
                    ref={buttonRef}
                    onClick={toggleDropdownHandler}
                >
                    <BiChevronDown className="user__dropdown-icon" />
                </button>

                <div ref={dropdownRef} className={`dropdown ${showDropdown ? "show" : ""}`}>
                    <Link to="">Profile</Link>
                    <Link to="">Settings</Link>
                    <Link to="">Help</Link>
                    <Link className="logout" to="" onClick={logoutHandler}>
                        Log out
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default User;
