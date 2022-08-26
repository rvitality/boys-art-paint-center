import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout/Layout.component";

import Profile from "./routes/Profile/Profile.route";
import Auth from "./routes/Auth/Auth.route";
import { useAuthContext } from "./store/auth-context";

const App = () => {
    const authContext = useAuthContext();

    return (
        <Routes>
            <Route path="/boys-art-paint-center-delivery" element={<Auth />} />

            <Route
                path="/boys-art-paint-center-delivery/*"
                element={
                    authContext.isLoggedIn ? (
                        <Layout />
                    ) : (
                        <Navigate to="/boys-art-paint-center-delivery" />
                    )
                }
            />

            <Route
                path="/boys-art-paint-center-delivery/profile"
                element={
                    authContext.isLoggedIn ? (
                        <Profile />
                    ) : (
                        <Navigate to="/boys-art-paint-center-delivery" />
                    )
                }
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

// const arr = ["banana", "apple", "zebra", "dog", "cat"];

// // -1 - reverse
// // 0 - not changes
// // 1
// const sorted = arr.sort((a, b) => -1);

// function compareFn(a, b) {
//     if (a is less than b by some ordering criterion) {
//       return -1;
//     }
//     if (a is greater than b by the ordering criterion) {
//       return 1;
//     }
//     // a must be equal to b
//     return 0;
//   }
