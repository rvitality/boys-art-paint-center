import React from "react";
import DataPreview from "../../routes/DataPreview/DataPreview.route";

import Header from "../../routes/Header/Header.route";

import "./Layout.styles.scss";

const Layout = props => {
    return (
        <main className="main">
            <Header />
            <DataPreview />
        </main>
    );
};

export default Layout;
