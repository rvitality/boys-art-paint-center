import React from "react";

import Header from "../../routes/Header/Header.route";

const Layout = props => {
    return (
        <>
            <Header />
            <main>{props.children}</main>
        </>
    );
};

export default Layout;
