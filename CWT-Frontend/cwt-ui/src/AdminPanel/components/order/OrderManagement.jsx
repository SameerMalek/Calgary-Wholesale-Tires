import React, { useState } from 'react';
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
        products: [
          { name: "Product 1", quantity: 2, price: 29.99 },
          { name: "Product 2", quantity: 1, price: 89.99 }
        ]
      }
    ],
    preparing: [
      {
        billNo: "234567",
        customerName: "Jane Smith",
        address: "45 Maple Ave, Vancouver, BC",
        order_date: "2024-09-29",
        total_amount: 45.50,
        status: "Preparing",
        products: [
          { name: "Product 3", quantity: 1, price: 45.50 }
        ]
      },
      {
        billNo: "234568",
        customerName: "Mark Johnson",
        address: "789 Oak St, Montreal, QC",
        order_date: "2024-09-28",
        total_amount: 89.99,
        status: "Preparing",
        products: [
          { name: "Product 4", quantity: 2, price: 44.99 }
        ]
      }
    ],
    readyForDelivery: [
      {
        billNo: "543216",
        customerName: "Michael Johnson",
        address: "789 Pine St, Calgary, AB",
        order_date: "2024-09-25",
        total_amount: 89.99,
        status: "Ready for Delivery",
        products: [
          { name: "Product 5", quantity: 3, price: 29.99 }
        ]
      }
    ]
  });

  const [expandedRows, setExpandedRows] = useState([]);

  const toggleExpandRow = (billNo) => {
    if (expandedRows.includes(billNo)) {
      setExpandedRows(expandedRows.filter(row => row !== billNo));
    } else {
      setExpandedRows([...expandedRows, billNo]);
    }
  };

  const handleStatusChange = (e, orderGroup, billNo) => {
    const updatedOrders = orders[orderGroup].map(order =>
      order.billNo === billNo ? { ...order, status: e.target.value } : order
    );
    setOrders({ ...orders, [orderGroup]: updatedOrders });
  };

  const handleEditOrder = (billNo) => {
    alert(`Editing order: ${billNo}`);
    
  };

  const handleCancelRefund = (billNo) => {
    alert(`Cancel/Refund order: ${billNo}`);
   
  };

  const renderOrderGroup = (groupTitle, group) => (
    <div className="orderGroup">
      <h2 className="orderGroupTitle">{groupTitle}</h2>
      {orders[group].map(order => (
        <div key={order.billNo}>
          <div className="tableRow">
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
              <button className="viewBtn" onClick={() => toggleExpandRow(order.billNo)}>View Products</button>
              <button className="editBtn" onClick={() => handleEditOrder(order.billNo)}>Edit</button>
              <button className="cancelBtn" onClick={() => handleCancelRefund(order.billNo)}>Cancel/Refund</button>
            </div>
          </div>

          {expandedRows.includes(order.billNo) && (
            <div className="collapsiblePanel">
              <h3>Products Ordered</h3>
              <ul>
                {order.products.map((product, index) => (
                  <li key={index}>{product.name} - Qty: {product.quantity} - Price: ${product.price.toFixed(2)}</li>
                ))}
              </ul>
            </div>
          )}
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
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;
