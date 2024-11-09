import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./Delivery.scss";

const Delivery = () => {
  const [deliveredOrders, setDeliveredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem("deliveredOrders")) || [];
    setDeliveredOrders(orders);
  }, []);

  useEffect(() => {
    filterOrders();
  }, [searchTerm, dateRange, deliveredOrders]);

  const filterOrders = () => {
    let filtered = deliveredOrders;

    // Filter by customer name
    if (searchTerm) {
      filtered = filtered.filter((order) =>
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by date range
    if (dateRange.start) {
      filtered = filtered.filter(
        (order) => new Date(order.order_date) >= new Date(dateRange.start)
      );
    }
    if (dateRange.end) {
      filtered = filtered.filter(
        (order) => new Date(order.order_date) <= new Date(dateRange.end)
      );
    }

    setFilteredOrders(filtered);
  };

  const handleTrackingUpdate = (orderId, trackingNumber) => {
    const updatedOrders = deliveredOrders.map((order) =>
      order._id === orderId ? { ...order, trackingNumber } : order
    );
    setDeliveredOrders(updatedOrders);
    localStorage.setItem("deliveredOrders", JSON.stringify(updatedOrders));
  };

  const downloadInvoice = async (orderId) => {
    try {
      if (!orderId) {
        console.error("Invalid orderId passed to downloadInvoice:", orderId);
        return;
      }

      const response = await fetch(
        `http://localhost:8800/api/orders/order/${orderId}/invoice`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `invoice-${orderId}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } else {
        console.error("Failed to download invoice");
      }
    } catch (error) {
      console.error("Error downloading invoice:", error);
    }
  };

  const markAsComplete = (orderId) => {
    const updatedOrders = deliveredOrders.filter(
      (order) => order._id !== orderId
    );
    setDeliveredOrders(updatedOrders);
    localStorage.setItem("deliveredOrders", JSON.stringify(updatedOrders));
  };

  return (
    <div className="delivery">
      <div className="deliveryContainer">
        <div className="content">
          <h2>Delivery Page</h2>

          {/* Search and Filter Options */}
          <div className="filters">
            <input
              type="text"
              placeholder="Search by customer name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="searchInput"
            />
            <div className="dateFilters">
              <label>
                Start Date:
                <input
                  type="date"
                  name="start"
                  value={dateRange.start}
                  onChange={(e) =>
                    setDateRange({ ...dateRange, start: e.target.value })
                  }
                />
              </label>
              <label>
                End Date:
                <input
                  type="date"
                  name="end"
                  value={dateRange.end}
                  onChange={(e) =>
                    setDateRange({ ...dateRange, end: e.target.value })
                  }
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
                <div
                  key={`${order._id}-${order.customerName}`}
                  className="deliveryCard"
                >
                  <div className="orderInfo">
                    <p>
                      <strong>Order ID:</strong> {order._id}
                    </p>
                    <p>
                      <strong>Customer:</strong> {order.customerName}
                    </p>
                  </div>
                  <div>
                    <strong>Tracking Number:</strong>
                    <input
                      type="text"
                      placeholder="Enter tracking number"
                      value={order.trackingNumber || ""}
                      onChange={(e) =>
                        handleTrackingUpdate(order._id, e.target.value)
                      }
                      className="trackingInput"
                    />
                  </div>
                  <div className="buttons">
                    <button
                      onClick={() => downloadInvoice(order._id)}
                      className="invoiceButton"
                    >
                      Download Invoice
                    </button>
                    <button
                      onClick={() => markAsComplete(order._id)}
                      className="completeButton"
                    >
                      Mark as Complete
                    </button>
                  </div>
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
