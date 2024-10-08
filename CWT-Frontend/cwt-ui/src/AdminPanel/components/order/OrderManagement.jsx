import React, { useState } from 'react';
import './OrderManagement.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';

const OrderManagement = () => {
  const [orders, setOrders] = useState({
    newOrders: [
      {
        billNo: "878656",
        tokenNo: "123",
        customerName: "John Doe",
        address: "387 New Estate St, Toronto, ON",
        order_date: "2024-09-30",
        total_amount: 120.99,
        status: "Pending",
      },
    ],
    preparing: [
      {
        billNo: "234567",
        tokenNo: "124",
        customerName: "Jane Smith",
        address: "45 Maple Ave, Vancouver, BC",
        order_date: "2024-09-29",
        total_amount: 45.50,
        status: "Preparing",
      },
      {
        billNo: "234568",
        tokenNo: "125",
        customerName: "Mark Johnson",
        address: "789 Oak St, Montreal, QC",
        order_date: "2024-09-28",
        total_amount: 89.99,
        status: "Preparing",
      }
    ],
    readyForDelivery: [
      {
        billNo: "543216",
        tokenNo: "126",
        customerName: "Michael Johnson",
        address: "789 Pine St, Calgary, AB",
        order_date: "2024-09-25",
        total_amount: 89.99,
        status: "Ready for Delivery",
      }
    ]
  });

  const handleStatusChange = (e, orderGroup, billNo) => {
    const updatedOrders = orders[orderGroup].map(order =>
      order.billNo === billNo ? { ...order, status: e.target.value } : order
    );
    setOrders({ ...orders, [orderGroup]: updatedOrders });
  };

  const renderOrderGroup = (groupTitle, group) => (
    <div>
      <h2>{groupTitle}</h2>
      {orders[group].map(order => (
        <div key={order.billNo} className="tableRow">
          <div className="tableItem">{order.billNo}</div>
          <div className="tableItem">{order.tokenNo}</div>
          <div className="tableItem">
            <div>{order.customerName}</div>
            <div>{order.address}</div>
          </div>
          <div className="tableItem">{new Date(order.order_date).toLocaleDateString()}</div>
          <div className="tableItem">${order.total_amount.toFixed(2)}</div>
          <div className="tableItem">
            <select
              value={order.status}
              onChange={(e) => handleStatusChange(e, group, order.billNo)}
            >
              <option value="Pending">Pending</option>
              <option value="Preparing">Preparing</option>
              <option value="Ready for Delivery">Ready for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
          <div className="tableItem actions">
            <button className="editBtn">Edit</button>
            <button className="cancelBtn">Cancel/Refund</button>
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
          {/* Titles for the columns */}
          <div className="tableHeader">
            <div className="tableItem">Bill No.</div>
            <div className="tableItem">Token No.</div>
            <div className="tableItem">Ordered By</div>
            <div className="tableItem">Date</div>
            <div className="tableItem">Total</div>
            <div className="tableItem">Status</div>
            <div className="tableItem actionsTitle">Actions</div>
          </div>

          {renderOrderGroup("New Orders", "newOrders")}
          {renderOrderGroup("Preparing", "preparing")}
          {renderOrderGroup("Ready for Delivery", "readyForDelivery")}
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;
