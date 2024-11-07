import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderHistory = ({ userId }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch user orders
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`/api/orders/${userId}`);
                setOrders(response.data.orders);
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [userId]);

    if (loading) return <p>Loading order history...</p>;

    return (
        <div>
            <h2>Your Order History</h2>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <ul>
                    {orders.map((order) => (
                        <li key={order.id}>
                            <h3>Order #{order.id}</h3>
                            <p>Status: {order.status}</p>
                            <p>Payment Status: {order.payment_status}</p>
                            <p>Total Amount: ${order.total_amount.toFixed(2)}</p>
                            <h4>Items:</h4>
                            <ul>
                                {order.orderItems.map((item) => (
                                    <li key={item.id}>
                                        <p>Product: {item.product.name}</p>
                                        <p>Quantity: {item.quantity}</p>
                                        <p>Price: ${item.price}</p>
                                    </li>
                                ))}
                            </ul>
                            <p>Ordered on: {new Date(order.createdAt).toLocaleDateString()}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default OrderHistory;
