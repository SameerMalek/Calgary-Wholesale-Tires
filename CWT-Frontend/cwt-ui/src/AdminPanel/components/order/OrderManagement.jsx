import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderManagement.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';

const OrderManagement = () => {
  const [orders, setOrders] = useState({
    newOrders: [
      {
        billNo: "878656",
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
        customerName: "Jane Smith",
        address: "45 Maple Ave, Vancouver, BC",
        order_date: "2024-09-29",
        total_amount: 45.50,
        status: "Preparing",
      },
    ],
    readyForDelivery: [
      {
        billNo: "543216",
        customerName: "Michael Johnson",
        address: "789 Pine St, Calgary, AB",
        order_date: "2024-09-25",
        total_amount: 89.99,
        status: "Ready for Delivery",
      },
    ]
  });

  const navigate = useNavigate();

  const handleStatusChange = (e, currentGroup, billNo) => {
    const newStatus = e.target.value;
    const orderToUpdate = orders[currentGroup].find(order => order.billNo === billNo);

    if (orderToUpdate) {
      orderToUpdate.status = newStatus;
      const updatedCurrentGroup = orders[currentGroup].filter(order => order.billNo !== billNo);

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
    }
  };

  const renderOrderGroup = (groupTitle, group) => (
    <div className="orderGroup">
      <h2 className="orderGroupTitle">{groupTitle}</h2>
      {orders[group].map(order => (
        <div key={order.billNo} className="tableRow">
          <div className="tableItem">{order.billNo}</div>
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
          <div className="tableHeader">
            <div className="tableItem">Bill No.</div>
            <div className="tableItem">Ordered By</div>
            <div className="tableItem">Date</div>
            <div className="tableItem">Total</div>
            <div className="tableItem">Status</div>
            <div className="tableItem actionsTitle">Actions</div>
          </div>
          {renderOrderGroup("New Orders", "newOrders")}
          {renderOrderGroup("Preparing", "preparing")}
          {renderOrderGroup("Ready for Delivery", "readyForDelivery")}

          {/* Dedicated Invoice Section */}
          <div className="invoiceSection">
            <h2 className="orderGroupTitle">Invoices</h2>
            <p>Manage all invoices related to orders here.</p>
            {/* You can add buttons or links to view specific invoices */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;
