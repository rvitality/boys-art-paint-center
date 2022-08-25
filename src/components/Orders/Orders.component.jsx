import React, { useEffect } from "react";

import { getDataAndDocuments } from "../../utils/firebase/firebase.utils";
import { useInfoContext } from "../../store/info-context";

import DataTable from "../DataTable/DataTable.component";
import OrdersTable from "./OrdersTable/OrdersTable.component";

// import "./Orders.styles.scss";

const Orders = () => {
    const { orders } = useInfoContext();

    useEffect(() => {
        const fetchOrders = async () => {
            const res = await getDataAndDocuments("orders");
            orders.setOrders(res);
        };

        if (orders.data.length === 0) {
            fetchOrders();
        }
    }, [orders]);

    return <DataTable name="Products" fetchedData={orders} Table={OrdersTable} />;
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
