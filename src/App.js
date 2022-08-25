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

function warnTheSheep(queue) {
    const firstAnimal = queue[queue.length - 1];
    if (firstAnimal === "wolf") return "Pls go away and stop eating my sheep";

    for (let i = queue.length - 1; i >= 0; i--) {
        const nextAnimal = queue[i - 1];

        if (nextAnimal === "wolf")
            return `Oi! Sheep number ${queue.length - i}! You are about to be eaten by a wolf!`;
    }
}
