import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext.jsx";
import Modal from "../modal2/modal2.jsx";
import "./orderhistory.scss";

const OrderHistory = () => {
  const { currentUser } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [productDetails, setProductDetails] = useState({});

  useEffect(() => {
    const fetchOrders = async () => {
      if (!currentUser) {
        console.error("No user logged in");
        setError("User not authenticated");
        setLoading(false);
        return;
      }

      try {
        const userId = currentUser.id;
        const response = await axios.get(
          `https://calgary-wholesale-tires.onrender.com/api/orders/user/${userId}/orders`
        );
        setOrders(response.data.orders || []);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentUser]);

  const openOrderDetails = async (order) => {
    setSelectedOrder(order);
    const fetchedProductDetails = {};

    for (const item of order.orderItems) {
      try {
        const response = await axios.get(
          `https://calgary-wholesale-tires.onrender.com/api/product/${item.product_id}`
        );
        fetchedProductDetails[item.product_id] = response.data.product;
      } catch (error) {
        console.error("Error fetching product details:", error.message);
      }
    }

    setProductDetails(fetchedProductDetails);
  };

  const closeOrderDetails = () => {
    setSelectedOrder(null);
    setProductDetails({});
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="order-history">
      <h2>Your Order History</h2>
      {error ? (
        <p>{error}</p>
      ) : orders.length ? (
        orders.map((order) => (
          <div key={order.id} className="order">
            <div className="order-header">
              <p className="order-id">Order ID: {order.id}</p>
              <p className="order-date">
                Order Date: {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="order-summary">
              <p className="total-amount">
                Total: ${order.total_amount.toFixed(2)}
              </p>
              <p className={`status status-${order.status.toLowerCase()}`}>
                {order.status}
              </p>
            </div>
            <div className="order-footer">
              <p
                className="view-details"
                onClick={() => openOrderDetails(order)}
              >
                View Details
              </p>
            </div>
          </div>
        ))
      ) : (
        <p className="no-orders">No orders found!</p>
      )}

      {/* Modal for Order Details */}
      <Modal isOpen={!!selectedOrder} onClose={closeOrderDetails}>
        {selectedOrder && (
          <div className="modal2-content">
            <h3>Order Details</h3>

            <div className="modal-field">
              <span className="modal-field-label">Date:</span>
              <span className="modal-field-content">
                {new Date(selectedOrder.createdAt).toLocaleDateString()}
              </span>
            </div>

            <div className="modal-field">
              <span className="modal-field-label">Total Amount:</span>
              <span className="modal-field-content">
                ${selectedOrder.total_amount.toFixed(2)}
              </span>
            </div>

            <div className="modal-field">
              <span className="modal-field-label">Payment Status:</span>
              <span
                className={`status-${selectedOrder.status.toLowerCase()} modal-field-content`}
              >
                {selectedOrder.status}
              </span>
            </div>

            <div className="order-items">
              {selectedOrder.orderItems.map((item) => (
                <div key={item.product_id} className="order-item">
                  <div className="modal-field">
                    <span className="modal-field-label">Product Name:</span>
                    <span className="modal-field-content">
                      {productDetails[item.product_id]?.name || "Loading..."}
                    </span>
                  </div>

                  <div className="modal-field">
                    <span className="modal-field-label">Quantity:</span>
                    <span className="modal-field-content">{item.quantity}</span>
                  </div>

                  <div className="modal-field">
                    <span className="modal-field-label">Price:</span>
                    <span className="modal-field-content">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>

                  {productDetails[item.product_id] && (
                    <div className="modal-field">
                      <span className="modal-field-label">Description:</span>
                      <span className="modal-field-content">
                        {productDetails[item.product_id].description}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default OrderHistory;
