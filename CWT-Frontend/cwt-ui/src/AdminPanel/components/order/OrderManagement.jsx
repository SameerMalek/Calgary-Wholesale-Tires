import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './OrderManagement.scss';

const OrderManagement = () => {
  const [orders, setOrders] = useState({
    newOrders: [],
    preparing: [],
    readyForDelivery: [],
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://calgary-wholesale-tires.onrender.com/api/orders/all");
        setOrders(response.data || {});
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to load orders.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p className="error-message">{error}</p>;

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      console.log("Updating order status:", { orderId, newStatus });
      const response = await axios.put(`https://calgary-wholesale-tires.onrender.com/api/orders/order/${orderId}`, { status: newStatus });
      console.log("API Response:", response.data);
  
      setOrders((prevOrders) => {
        const updatedOrders = { ...prevOrders };
        Object.keys(updatedOrders).forEach((statusKey) => {
          updatedOrders[statusKey] = updatedOrders[statusKey].filter((order) => order.id !== orderId);
        });
  
        const updatedOrder = {
          ...prevOrders.newOrders.find((order) => order.id === orderId) ||
          prevOrders.preparing.find((order) => order.id === orderId) ||
          prevOrders.readyForDelivery.find((order) => order.id === orderId),
          status: newStatus,
        };
  
        const newGroup = getOrderGroupByStatus(newStatus);
        updatedOrders[newGroup].push(updatedOrder);
  
        // If the order is completed, move it to the Delivery page (store in localStorage)
        if (newStatus === "Completed") {
          const deliveredOrders = JSON.parse(localStorage.getItem("deliveredOrders")) || [];
          deliveredOrders.push(updatedOrder);
          localStorage.setItem("deliveredOrders", JSON.stringify(deliveredOrders));
        }
  
        return updatedOrders;
      });
    } catch (error) {
      console.error("Failed to update order status:", error.response?.data || error.message);
      alert("Failed to update order status.");
    }
  };   

  const handleCancel = async (orderId) => {
    try {
      // Cancel the order and get the response
      const response = await axios.delete(`https://calgary-wholesale-tires.onrender.com/api/orders/order/${orderId}`);
      const { message, refund } = response.data;
  
      // Notify the user
      alert(message || "Order canceled successfully.");
  
      // Optionally display refund details
      if (refund) {
        alert(`
          Refund Processed:
          - Refund ID: ${refund.id}
          - Amount: $${refund.amount}
          - Status: ${refund.status}
          - Created: ${new Date(refund.created).toLocaleString()}
        `);
      }
  
      // Remove the canceled order from state
      setOrders((prevOrders) => {
        const updatedOrders = { ...prevOrders };
        Object.keys(updatedOrders).forEach((statusKey) => {
          updatedOrders[statusKey] = updatedOrders[statusKey].filter((order) => order.id !== orderId);
        });
        return updatedOrders;
      });
    } catch (error) {
      console.error("Error canceling order:",  error.response?.data || error);
      alert(error.response?.data?.message ||"Failed to cancel order.");
    }
  };
  

  const getOrderGroupByStatus = (status) => {
    switch (status) {
      case "Pending":
        return "newOrders";
      case "Preparing":
        return "preparing";
      case "Ready for Delivery":
        return "readyForDelivery";
      default:
        return "newOrders";
    }
  };
  

  return (
    <div className="order-management-container">
      <h2>Order Management</h2>
      {/* <button className="refresh-button" onClick={() => window.location.reload()}>Refresh Orders</button> */}

      <OrderSection title="New Orders" orders={orders.newOrders} onStatusChange={handleStatusChange} onCancel={handleCancel} />
      <OrderSection title="Preparing" orders={orders.preparing} onStatusChange={handleStatusChange} onCancel={handleCancel} />
      <OrderSection title="Ready for Delivery" orders={orders.readyForDelivery} onStatusChange={handleStatusChange} onCancel={handleCancel} />
    </div>
  );
};

const OrderSection = ({ title, orders, onStatusChange, onCancel }) => (
  <section className="order-section">
    <h3 className="section-title">{title}</h3>
    <div className="order-table">
      <div className="order-table-header">
        <span>Order ID</span>
        <span>Customer Name</span>
        <span>Date</span>
        <span>Total</span>
        <span>Payment Status</span> 
        <span>Status</span>
        <span>Actions</span>
      </div>
      {orders.map(order => (
        <OrderRow key={order.id} order={order} onStatusChange={onStatusChange} onCancel={onCancel} />
      ))}
    </div>
  </section>
);

const OrderRow = ({ order, onStatusChange, onCancel }) => {
  const handleStatusChange = (event) => {
    onStatusChange(order.id, event.target.value);
  };

  const paymentStatusClass = order.payment_status === 'completed' ? 'payment-completed' : 'payment-pending';

  return (
    <div className="order-row">
      <span>{order.id}</span>
      <span>{order.user ? `${order.user.firstName} ${order.user.lastName}` : 'Unknown User'}</span>
      <span>{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}</span>
      <span>${order.total_amount.toFixed(2)}</span>
      <span className={paymentStatusClass}>{order.payment_status || 'Unknown'}</span> {/* Dynamic class for payment status */}
      <span>
        <select value={order.status} onChange={handleStatusChange} className="status-dropdown">
          <option value="Pending">Pending</option>
          <option value="Preparing">Preparing</option>
          <option value="Ready for Delivery">Ready for Delivery</option>
          <option value="Completed">Completed</option>
        </select>
      </span>
      <span className="action-buttons">
        <button className="cancel-button" onClick={() => onCancel(order.id)}>Cancel/Refund</button>
        {order.refund && <p className="refund-info">Refund Issued: {order.refund.id}</p>}
      </span>
    </div>
  );
};

export default OrderManagement;
