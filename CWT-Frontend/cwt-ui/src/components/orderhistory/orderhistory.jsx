import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './orderhistory.scss';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const userId = // Retrieve userId from auth context or route params
            try {
                const response = await axios.get(`/orders/user/${userId}`);
                setOrders(response.data);
            } 
            catch (error) {
                console.error("Error fetching order history:", error);
            }
        };
        fetchOrders();
    }, []);

    return (
        <div className="order-history">
            <h2>Your Order History</h2>
            {orders.length ? (
                orders.map(order => (
                    <div key={order.order_id} className="order">
                        <p>Order ID: {order.order_id}</p>
                        <p>Order Date: {order.order_date}</p>
                        <p>Status: {order.status}</p>
                        <p>Total: ${order.total_amount}</p>
                        {/* Map through each item in order.items to display product details */}
                    </div>
                ))
            ) : (
                <p>No orders found.</p>
            )}
        </div>
    );
};

export default OrderHistory;
