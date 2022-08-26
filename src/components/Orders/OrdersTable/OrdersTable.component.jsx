import React, { useState, useEffect } from "react";
import SortAbleTableHeader from "../../SortAbleTableHeader/SortAbleTableHeader.component";

import "./OrdersTable.styles.scss";

const OrdersTable = ({ dataToDisplay: ordersToDisplay }) => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        setOrders(ordersToDisplay);
    }, [ordersToDisplay]);

    const sortHandler = sortedData => setOrders(sortedData);

    return (
        <table className="orders-table">
            <thead>
                <tr>
                    <SortAbleTableHeader
                        dataArr={ordersToDisplay}
                        onSort={sortHandler}
                        typeToSort="name"
                        className="span-2"
                    >
                        Name
                    </SortAbleTableHeader>

                    <th className="span-2">Address</th>
                    <th>Phone</th>
                    <th>Payment</th>
                    <th>Order Type</th>

                    <SortAbleTableHeader
                        dataArr={ordersToDisplay}
                        onSort={sortHandler}
                        typeToSort="status"
                    >
                        Status
                    </SortAbleTableHeader>

                    <th>Date</th>
                    <th>Time</th>

                    <SortAbleTableHeader
                        dataArr={ordersToDisplay}
                        onSort={sortHandler}
                        typeToSort="total"
                    >
                        Total
                    </SortAbleTableHeader>

                    <SortAbleTableHeader
                        dataArr={ordersToDisplay}
                        onSort={sortHandler}
                        typeToSort="cart"
                    >
                        Items
                    </SortAbleTableHeader>

                    <th></th>
                </tr>
            </thead>

            <tbody>
                {orders?.map(order => {
                    const { fullName, phoneNumber } = order.customerInfo;
                    const {
                        getPaymentTypeString,
                        getOrderTypeString,
                        scheduledDate,
                        scheduledTime,
                    } = order.orderInfo;
                    const { fullAddress } = order.addressInfo;
                    const { orderID, status, total, cart } = order;

                    return (
                        <tr key={orderID}>
                            <td className="span-2">{fullName}</td>
                            <td className="span-2">{fullAddress}</td>
                            <td>{phoneNumber}</td>
                            <td>
                                {getPaymentTypeString.toLowerCase() === "cash on delivery"
                                    ? "COD"
                                    : getPaymentTypeString}
                            </td>
                            <td>{getOrderTypeString}</td>
                            <td className={`status ${status.toLowerCase()}`}>{status}</td>
                            <td>{scheduledDate}</td>
                            <td>{scheduledTime}</td>
                            <td className="bold">
                                ₱
                                {Math.round(total).toLocaleString("en-US", {
                                    minimumFractionDigits: 2,
                                })}
                            </td>
                            <td>{cart.length}</td>
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

export default OrdersTable;
