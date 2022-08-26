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
                        typeToSort="Name"
                        className="span-2"
                    />
                    <SortAbleTableHeader
                        dataArr={ordersToDisplay}
                        onSort={sortHandler}
                        typeToSort="Address"
                        className="span-2"
                    />
                    <th>Phone</th>
                    <th>Payment</th>
                    <th>Order Type</th>
                    <SortAbleTableHeader
                        dataArr={ordersToDisplay}
                        onSort={sortHandler}
                        typeToSort="Status"
                    />
                    <th>Date</th>
                    <th>Time</th>
                    <th>Total</th>
                    <th>Cart</th>
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
                    const { orderID, status, total, cartLength } = order;

                    return (
                        <tr key={orderID}>
                            <td className="span-2">{fullName}</td>
                            <td className="span-2">{fullAddress}</td>
                            <td>{phoneNumber}</td>
                            <td>{getPaymentTypeString}</td>
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
                            <td>{cartLength}</td>
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
