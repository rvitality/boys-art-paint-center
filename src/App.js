import React from "react";

import { Routes, Route } from "react-router-dom";

import Navigation from "./components/Navigation/Navigation.component";
import Home from "./routes/Home/Home.route";

const App = () => {
    return (
        <main className="app">
            <Routes>
                <Route path="/boys-art-paint-center-delivery" element={<Navigation />}>
                    <Route index path="/boys-art-paint-center-delivery/*" element={<Home />} />
                </Route>
                <Route
                    path="*"
                    element={
                        <>
                            <Navigation />
                            <p>There is nothing here!</p>
                        </>
                    }
                />
            </Routes>
        </main>
    );
};

export default App;
