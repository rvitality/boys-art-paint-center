import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../store/auth-context";

import { signInAuthWithEmailAndPassword } from "../../utils/firebase/firebase.utils";

import "./Auth.styles.scss";

const Auth = () => {
    const authContext = useAuthContext();

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const emailRef = useRef();
    const passRef = useRef();

    const navigate = useNavigate();

    // useEffect(() => {
    //     const fetchUsers = async () => {
    //         const response = await fetch("https://kokopipdelivery.firebaseio.com/users.json");
    //         console.log(response);

    //         const data = await response.json();
    //         console.log(data);
    //     };

    //     fetchUsers();
    // }, []);

    const loginHandler = e => {
        e.preventDefault();

        setError("");
        setIsLoading("");

        const enteredEmail = emailRef.current.value;
        const enteredPassword = passRef.current.value;

        const sendRequest = async () => {
            try {
                const response = await signInAuthWithEmailAndPassword(
                    enteredEmail,
                    enteredPassword
                );

                console.log(response);

                authContext.login(response.user);
                navigate("/boys-art-paint-center-delivery/info");
            } catch (err) {
                console.log(err.message);
                setError(err.message);
            }
        };

        sendRequest();
    };

    return (
        <section className="auth">
            <h2 className="auth__login-heading">Login</h2>
            <form onSubmit={loginHandler}>
                <div className="form-control">
                    <label htmlFor="email" className="form-control__label">
                        Email
                    </label>
                    <input type="email" ref={emailRef} id="email" required />
                </div>
                <div className="form-control">
                    <label htmlFor="password" className="form-control__label">
                        Password
                    </label>
                    <input type="password" ref={passRef} id="password" />
                </div>
                <div className="auth__actions">
                    <button type="submit">Login</button>
                </div>
            </form>
        </section>
    );
};

export default Auth;
