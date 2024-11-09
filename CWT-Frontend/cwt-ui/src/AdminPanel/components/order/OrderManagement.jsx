import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderManagement.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';

const OrderManagement = () => {
  const [orders, setOrders] = useState({
    newOrders: [
      {
        _id: "672283fed6ac777264b2aaff",
        customerName: "John Doe",
        address: "387 New Estate St, Toronto, ON",
        order_date: "2024-09-30",
        total_amount: 120.99,
        status: "Pending",
      },
    ],
    preparing: [
      {
        _id: "64b8f9f84f1e2d5a089f07a1",
        customerName: "Jane Smith",
        address: "45 Maple Ave, Vancouver, BC",
        order_date: "2024-09-29",
        total_amount: 45.50,
        status: "Preparing",
      },
    ],
    readyForDelivery: [
      {
        _id: "64e283fed7ac777264b2bbcd",
        customerName: "Michael Johnson",
        address: "789 Pine St, Calgary, AB",
        order_date: "2024-09-25",
        total_amount: 89.99,
        status: "Ready for Delivery",
      },
    ],
  });

  const navigate = useNavigate();

  // Fetch orders from the database and update state
  const fetchOrders = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:8800/api/orders');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const fetchedOrders = await response.json();

      const newFetchedOrders = fetchedOrders.filter(order => order.status === 'Pending');
      const preparingFetchedOrders = fetchedOrders.filter(order => order.status === 'Preparing');
      const readyForDeliveryFetchedOrders = fetchedOrders.filter(order => order.status === 'Ready for Delivery');

      setOrders({
        newOrders: newFetchedOrders,
        preparing: preparingFetchedOrders,
        readyForDelivery: readyForDeliveryFetchedOrders,
      });
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000); // Polling every 5 seconds
    return () => clearInterval(interval);
  }, [fetchOrders]);

  const handleStatusChange = async (e, currentGroup, orderId) => {
    const newStatus = e.target.value;
    const orderToUpdate = orders[currentGroup].find(order => order._id === orderId);

    if (orderToUpdate) {
      orderToUpdate.status = newStatus;
      const updatedCurrentGroup = orders[currentGroup].filter(order => order._id !== orderId);

      let newGroup;
      switch (newStatus) {
        case "Pending":
          newGroup = "newOrders";
          break;
        case "Preparing":
          newGroup = "preparing";
          break;
        case "Ready for Delivery":
          newGroup = "readyForDelivery";
          break;
        case "Delivered":
          const deliveredOrders = JSON.parse(localStorage.getItem('deliveredOrders')) || [];
          localStorage.setItem('deliveredOrders', JSON.stringify([...deliveredOrders, orderToUpdate]));
          navigate("/admin/delivery");
          return;
        default:
          newGroup = "newOrders";
      }

      const updatedNewGroup = [...orders[newGroup], orderToUpdate];
      setOrders({
        ...orders,
        [currentGroup]: updatedCurrentGroup,
        [newGroup]: updatedNewGroup,
      });

      // Update order status in the backend
      try {
        await fetch(`http://localhost:8800/api/orders/${orderId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: newStatus }),
        });
      } catch (error) {
        console.error("Error updating order status:", error);
      }
    }
  };

  const handleEdit = (orderId) => {
    alert(`Edit order with ID: ${orderId}`);
  };

  const handleCancelRefund = async (orderId, group) => {
    try {
      const response = await fetch(`http://localhost:8800/api/order/${orderId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Remove the order from the UI
      setOrders((prevOrders) => ({
        ...prevOrders,
        [group]: prevOrders[group].filter(order => order._id !== orderId),
      }));
    } catch (error) {
      console.error("Error canceling/refunding order:", error);
    }
  };

  const renderOrderGroup = (groupTitle, group) => (
    <div className="orderGroup">
      <h2 className="orderGroupTitle">{groupTitle}</h2>
      {orders[group].map(order => (
        <div key={order._id} className="tableRow">
          <div className="tableItem">{order._id}</div>
          <div className="tableItem">
            <div>{order.customerName}</div>
            <div>{order.address}</div>
          </div>
          <div className="tableItem">{new Date(order.order_date).toLocaleDateString()}</div>
          <div className="tableItem">${order.total_amount.toFixed(2)}</div>
          <div className="tableItem">
            <select
              value={order.status}
              onChange={(e) => handleStatusChange(e, group, order._id)}
            >
              <option value="Pending">Pending</option>
              <option value="Preparing">Preparing</option>
              <option value="Ready for Delivery">Ready for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
          <div className="tableItem actions">
            <button className="editBtn" onClick={() => handleEdit(order._id)}>Edit</button>
            <button className="cancelBtn" onClick={() => handleCancelRefund(order._id, group)}>Cancel/Refund</button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="orderManagement">
      <Sidebar />
      <div className="orderManagementContainer">
        <Navbar />
        <div className="content">
          <div className="tableHeader">
            <div className="tableItem">Bill No.</div>
            <div className="tableItem">Ordered By</div>
            <div className="tableItem">Date</div>
            <div className="tableItem">Total</div>
            <div className="tableItem">Status</div>
            <div className="tableItem actionsTitle">Actions</div>
          </div>
          {renderOrderGroup("New Orders", "newOrders")}
          {renderOrderGroup("Preparing Orders", "preparing")}
          {renderOrderGroup("Ready for Delivery Orders", "readyForDelivery")}
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;



