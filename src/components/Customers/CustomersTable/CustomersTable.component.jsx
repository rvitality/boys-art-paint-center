import React, { useState, useEffect } from "react";
import SortAbleTableHeader from "../../SortAbleTableHeader/SortAbleTableHeader.component";

import "./CustomersTable.styles.scss";

const CustomersTable = ({ dataToDisplay: customersToDisplay }) => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        setCustomers(customersToDisplay);
    }, [customersToDisplay]);

    const sortHandler = sortedData => setCustomers(sortedData);

    return (
        <table className="customers-table">
            <thead>
                <tr>
                    <SortAbleTableHeader
                        dataArr={customersToDisplay}
                        onSort={sortHandler}
                        typeToSort="Name"
                    />
                    <th>Address</th>
                    <th>Phone</th>
                    <SortAbleTableHeader
                        dataArr={customersToDisplay}
                        onSort={sortHandler}
                        typeToSort="Email"
                    />
                    <SortAbleTableHeader
                        dataArr={customersToDisplay}
                        onSort={sortHandler}
                        typeToSort="Role"
                    />
                    <th></th>
                </tr>
            </thead>

            <tbody>
                {customers?.map(customer => {
                    const {
                        userID,
                        firstName,
                        lastName,
                        phoneNumber,
                        email,
                        role,
                        latitude,
                        longitude,
                    } = customer;

                    let fullAddress;
                    const primaryAddress = customer.address
                        ? Object.values(customer.address).find(value => value.primary)
                        : "No address set.";

                    const { barangay, cityOrMunicipality, province } = primaryAddress;

                    if (!barangay || !cityOrMunicipality || !province) {
                        fullAddress = primaryAddress;
                    } else {
                        fullAddress = `${barangay}, ${cityOrMunicipality}, ${province}`;
                    }

                    return (
                        <tr key={userID}>
                            <td>{`${firstName} ${lastName}`}</td>
                            <td>{fullAddress}</td>
                            <td>{phoneNumber}</td>
                            <td style={{ textTransform: "lowercase" }}>{email}</td>
                            <td>{role}</td>
                            <td>
                                <span>Edit</span>
                                <span>Delete</span>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default CustomersTable;
