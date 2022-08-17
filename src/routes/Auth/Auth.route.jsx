import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../store/auth-context";

import { signInAuthWithEmailAndPassword } from "../../utils/firebase/firebase.utils";

import { signOutUser } from "../../utils/firebase/firebase.utils";

import "./Auth.styles.scss";

const Auth = () => {
    const authContext = useAuthContext();

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const emailRef = useRef();
    const passRef = useRef();

    const navigate = useNavigate();

    const loginHandler = e => {
        e.preventDefault();

        setError("");
        setIsLoading("");

        const enteredEmail = emailRef.current.value;
        const enteredPassword = passRef.current.value;

        const fetchUsers = async (token, uid) => {
            try {
                const response = await fetch(
                    `https://kokopipdelivery.firebaseio.com/users.json?auth=${token}`
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch users.");
                }

                const users = await response.json();

                if (!users) return;

                if (users[uid]?.role.toLowerCase() === "admin") {
                    authContext.login(users[uid]);
                    navigate("/boys-art-paint-center-delivery/overview");
                } else {
                    // navigate("/boys-art-paint-center-delivery");
                    await signOutUser();
                    alert("Unauthorized access.");
                }
            } catch (err) {
                setError(err.message);
                setIsLoading(false);
            }
        };

        const sendRequest = async () => {
            try {
                setIsLoading(true);
                setError("");

                const response = await signInAuthWithEmailAndPassword(
                    enteredEmail,
                    enteredPassword
                );

                await fetchUsers(response._tokenResponse.idToken, response.user.uid);

                setIsLoading(false);

                // check if user is admin
            } catch (err) {
                if (err.message.includes("wrong-password")) {
                    err.message = "Wrong credentials.";
                }

                setError(err.message);
                setIsLoading(false);
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
                    <input
                        type="email"
                        ref={emailRef}
                        id="email"
                        required
                        defaultValue="boysartenterprises@gmail.com"
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="password" className="form-control__label">
                        Password
                    </label>
                    <input type="password" ref={passRef} id="password" defaultValue="qwerty09" />
                </div>
                <div className="auth__error"></div>
                <div className="auth__actions">
                    {error && (
                        <small
                            style={{ color: "orange", fontStyle: "italic", marginBottom: "1rem" }}
                        >
                            {error}
                        </small>
                    )}
                    {isLoading ? (
                        <p style={{ color: "#fff" }}>
                            <em>Please wait...</em>
                        </p>
                    ) : (
                        <button type="submit">Log In</button>
                    )}
                </div>
            </form>
        </section>
    );
};

export default Auth;
