import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout/Layout.component";

import Profile from "./routes/Profile/Profile.route";
import Auth from "./routes/Auth/Auth.route";
import Home from "./routes/Home/Home.route";
import { useAuthContext } from "./store/auth-context";

const App = () => {
    const authContext = useAuthContext();

    return (
        <Layout>
            <Routes>
                {/* <Route path="/boys-art-paint-center-delivery" element={<Header />}>
                </Route> */}
                <Route
                    path="/boys-art-paint-center-delivery"
                    element={authContext.isLoggedIn ? <Profile /> : <Navigate to="auth" />}
                />

                <Route
                    path="/boys-art-paint-center-delivery/info/*"
                    element={
                        authContext.isLoggedIn ? (
                            <Home />
                        ) : (
                            <Navigate to="/boys-art-paint-center-delivery/auth" />
                        )
                    }
                />
                <Route path="/boys-art-paint-center-delivery/auth" element={<Auth />} />
                <Route
                    path="*"
                    element={
                        <>
                            <p>There is nothing here!</p>
                        </>
                    }
                />
            </Routes>
        </Layout>
    );
};

export default App;
