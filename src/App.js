import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout/Layout.component";

import Profile from "./routes/Profile/Profile.route";
import Auth from "./routes/Auth/Auth.route";
import { useAuthContext } from "./store/auth-context";

const App = () => {
    const authContext = useAuthContext();

    return (
        <Routes>
            <Route path="/" element={<Auth />} />

            <Route
                path="/*"
                element={
                    authContext.isLoggedIn ? (
                        <Layout />
                    ) : (
                        <Navigate to="/boys-art-paint-center-delivery" />
                    )
                }
            />

            <Route
                path="/profile"
                element={authContext.isLoggedIn ? <Profile /> : <Navigate to="/" />}
            />

            <Route
                path="*"
                element={
                    <>
                        <p>There is nothing here!</p>
                    </>
                }
            />
        </Routes>
    );
};

export default App;
