import React from "react";

import "./Error.styles.scss";

const Error = ({ title, message }) => {
    return (
        <section className="error-container">
            <h3>{title}</h3>
            <p>{message}</p>
        </section>
    );
};

export default Error;
