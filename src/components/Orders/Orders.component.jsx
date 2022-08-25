import React, { useEffect, useState } from "react";

import { getDataAndDocuments } from "../../utils/firebase/firebase.utils";
import { useInfoContext } from "../../store/info-context";

import DataTable from "../DataTable/DataTable.component";
import OrdersTable from "./OrdersTable/OrdersTable.component";

// import "./Orders.styles.scss";

const Orders = () => {
    const { orders } = useInfoContext();
    const [isLoading, setIsLoading] = useState(false);

    const filterBySearchHandler = (data, inputValue) => {
        if (!data) return;

        return data.filter(order => {
            const { fullName, phoneNumber } = order.customerInfo;
            const { getPaymentTypeString, getOrderTypeString } = order.orderInfo;
            const { fullAddress } = order.addressInfo;
            const { status } = order;

            return (
                fullName.toLowerCase().includes(inputValue) ||
                fullAddress.toLowerCase().includes(inputValue) ||
                status.toLowerCase().includes(inputValue) ||
                getPaymentTypeString.toLowerCase().includes(inputValue) ||
                getOrderTypeString.toLowerCase().includes(inputValue) ||
                phoneNumber.toLowerCase().includes(inputValue)
            );
        });
    };

    useEffect(() => {
        const fetchOrders = async () => {
            setIsLoading(true);
            try {
                const res = await getDataAndDocuments("orders");
                orders.setOrders(res);
            } catch (err) {
                console.log(err.message);
            }

            setIsLoading(false);
        };

        if (orders.data.length === 0) {
            fetchOrders();
        }
    }, [orders]);

    return (
        <DataTable
            categoryName="Orders"
            fetchedData={orders}
            isLoading={isLoading}
            onFilterBySearch={filterBySearchHandler}
            Table={OrdersTable}
        />
    );
};

export default Orders;

// customerInfo
//     - fullName
//     - phoneNumber

// orderInfo
//     - getPaymentString : "Cash on Delivery"
//     - getOrderTypeString: "Delivery"
//     - scheduledDate
//     - scheduledTime

// status
// total
// cartLength

// addressInfo
//     - fullAddress

// actions
