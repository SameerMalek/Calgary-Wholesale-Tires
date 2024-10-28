import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import './Delivery.scss';

const Delivery = () => {
  const [deliveredOrders, setDeliveredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem('deliveredOrders')) || [];
    setDeliveredOrders(orders);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDateRange({ ...dateRange, [name]: value });
  };

  const handleTrackingUpdate = (billNo, trackingNumber) => {
    const updatedOrders = deliveredOrders.map(order =>
      order.billNo === billNo ? { ...order, trackingNumber } : order
    );
    setDeliveredOrders(updatedOrders);
    localStorage.setItem('deliveredOrders', JSON.stringify(updatedOrders));
  };

  const filteredOrders = deliveredOrders.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const orderDate = new Date(order.order_date);
    const startDate = dateRange.start ? new Date(dateRange.start) : null;
    const endDate = dateRange.end ? new Date(dateRange.end) : null;
    const matchesDateRange =
      (!startDate || orderDate >= startDate) && (!endDate || orderDate <= endDate);

    return matchesSearch && matchesDateRange;
  });

  const markAsCompleted = (billNo) => {
    const updatedOrders = deliveredOrders.filter(order => order.billNo !== billNo);
    setDeliveredOrders(updatedOrders);
    localStorage.setItem('deliveredOrders', JSON.stringify(updatedOrders));
    alert(`Order ${billNo} has been marked as completed.`);
  };

  return (
    <div className="delivery">
      <Sidebar />
      <div className="deliveryContainer">
        <Navbar />
        <div className="content">
          <h2>Delivery Page</h2>
          
          {/* Search and Filter Options */}
          <div className="filters">
            <input
              type="text"
              placeholder="Search by customer name..."
              value={searchTerm}
              onChange={handleSearch}
              className="searchInput"
            />
            
            <div className="dateFilters">
              <label>
                Start Date:
                <input
                  type="date"
                  name="start"
                  value={dateRange.start}
                  onChange={handleDateChange}
                />
              </label>
              <label>
                End Date:
                <input
                  type="date"
                  name="end"
                  value={dateRange.end}
                  onChange={handleDateChange}
                />
              </label>
            </div>
          </div>

          {/* Display Delivered Orders */}
          <div className="deliveryList">
            {filteredOrders.length === 0 ? (
              <p>No delivered orders match your criteria.</p>
            ) : (
              filteredOrders.map((order) => (
                <div key={order.billNo} className="deliveryCard">
                  <div><strong>Bill No:</strong> {order.billNo}</div>
                  <div><strong>Customer:</strong> {order.customerName}</div>
                  <div><strong>Address:</strong> {order.address}</div>
                  <div><strong>Date:</strong> {new Date(order.order_date).toLocaleDateString()}</div>
                  <div><strong>Total:</strong> ${order.total_amount.toFixed(2)}</div>
                  
                  {/* Tracking Information */}
                  <div>
                    <strong>Tracking Number:</strong> 
                    <input
                      type="text"
                      placeholder="Enter tracking number"
                      value={order.trackingNumber || ""}
                      onChange={(e) => handleTrackingUpdate(order.billNo, e.target.value)}
                      className="trackingInput"
                    />
                  </div>

                  <button className="completeBtn" onClick={() => markAsCompleted(order.billNo)}>
                    Mark as Completed
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Delivery;
