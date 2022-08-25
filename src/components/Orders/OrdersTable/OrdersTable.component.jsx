import React from "react";

import "./OrdersTable.styles.scss";

const OrdersTable = ({ productsToDisplay }) => {
    console.log(productsToDisplay);
    return (
        <table className="orders-table">
            <thead>
                <tr>
                    <th className="span-2">Name</th>
                    <th className="span-2">Address</th>
                    <th>Phone</th>
                    <th>Payment</th>
                    <th>Order Type</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Total</th>
                    <th>Cart</th>
                    <th></th>
                </tr>
            </thead>

            <tbody>
                {productsToDisplay?.map(order => {
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
                            <td>{status}</td>
                            <td>{scheduledDate}</td>
                            <td>{scheduledTime}</td>
                            <td>{total}</td>
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
