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

// const calculator = expression => {
//     const arr = [];
//     let num = "";

//     for (let i = 0; i < expression.length; i++) {
//         const value = expression[i].trim();

//         if (!isNaN(+value)) {
//             // console.log(value);
//             num += value;
//         } else {
//             arr.push(num);
//             arr.push(expression[i]);
//             num = "";
//         }
//     }

//     arr.push(num);

//     console.log(arr);

//     // find all the indexes of * and /
// };

// calculator("15 +  - 10 / 2");

// 30

// 5

// ["13", "+", "2", "-", "5", "*", "2"]

// calculator("23+4") ➞ 27
// calculator("45-15") ➞ 30
// calculator("13+2-5*2") ➞ 5
// calculator("49/7*2-3") ➞ 11

// price , discount(%)
// returns the final price after the discount.
