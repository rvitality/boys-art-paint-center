import { createContext, useContext, useState } from "react";

const AuthContext = createContext({
    user: {},
    token: "",
    isLoggedIn: false,
    login: token => {},
    logout: () => {},
});

export const AuthContextProvider = props => {
    const [user, setUser] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const loginHandler = user => {
        // const { uid, email, phoneNumber } = user;
        setUser(user);
        setIsLoggedIn(true);
    };

    const logoutHandler = () => {
        setUser({});
        setIsLoggedIn(false);
    };

    const contextValue = {
        user,
        // token,
        isLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
    };

    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
