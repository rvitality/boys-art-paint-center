import React from "react";
import DataPreview from "../../routes/DataPreview/DataPreview.route";

import Header from "../../routes/Header/Header.route";
import Navigation from "../SideNav/SideNav.component";

import "./Layout.styles.scss";

const Layout = props => {
    return (
        <main className="main">
            <Navigation />

            <div className="main__right">
                <Header />
                <DataPreview />
            </div>

            {/* <div>{props.children}</div> */}
        </main>
    );
};

export default Layout;
