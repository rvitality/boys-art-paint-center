import React from "react";

import { useInfoContext } from "../../store/info-context";
import DataTable from "../DataTable/DataTable.component";
import CustomersTable from "./CustomersTable/CustomersTable.component";

const Customers = () => {
    const { customers } = useInfoContext();

    const filterBySearchHandler = (data, inputValue) => {
        if (!data) return;

        return data.filter(customer => {
            const { firstName, lastName, email, role } = customer;
            return (
                firstName.toLowerCase().includes(inputValue) ||
                lastName.toLowerCase().includes(inputValue) ||
                email.toLowerCase().includes(inputValue) ||
                role.toLowerCase().includes(inputValue)
            );
        });
    };

    return (
        <DataTable
            categoryName="Customers"
            fetchedData={customers}
            onFilterBySearch={filterBySearchHandler}
            Table={CustomersTable}
        />
    );
};

export default Customers;
