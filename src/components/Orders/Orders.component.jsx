import React, { useState, useEffect } from "react";

import { getDataAndDocuments } from "../../utils/firebase/firebase.utils";

const Orders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await getDataAndDocuments("orders");
            console.log(res);
            setOrders(res);
        };

        fetchData();
    }, []);
    return (
        <div>
            <h2>Orders</h2>
            <br />
            <hr />
            <br />
            {orders.map((order, index) => {
                const { email, firstName, fullName, lastName, phoneNumber, role } =
                    order.customerInfo;

                return (
                    <div key={order.orderID} style={{ border: "2px solid #000", padding: "2rem" }}>
                        <div style={{ borderBottom: "1px solid #333" }}>
                            <h4>Customer Info:</h4>
                            <p>
                                <b>Name: </b> {fullName}
                            </p>
                            <p>
                                <b>Email: </b> {email}
                            </p>
                            <p>
                                <b>Phone No.: </b> {phoneNumber}
                            </p>
                        </div>

                        <h4>Cart:</h4>
                        {order.cart.map((item, index) => {
                            const {
                                name,
                                brandString,
                                colorString,
                                imageUrl,
                                priceString,
                                quantity,
                                type,
                                volumeString,
                            } = item;

                            return (
                                <div
                                    key={`${order.orderID}_cart-item_${index}`}
                                    style={{ borderBottom: "1px solid #333" }}
                                >
                                    <p>{brandString}</p>
                                    <p>{colorString}</p>
                                    <p>Type: {type}</p>
                                    <p>{volumeString}</p>
                                    <p>Price: {priceString}</p>
                                    <p>Quantity: {quantity}</p>

                                    <img
                                        style={{ width: "100px", marginTop: "1rem" }}
                                        src={imageUrl}
                                        alt={name}
                                    />
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
};

export default Orders;
