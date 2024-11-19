// import React, { useEffect, useState, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './OrderManagement.scss';
// import Sidebar from '../../components/sidebar/Sidebar';
// import Navbar from '../../components/navbar/Navbar';

// const OrderManagement = () => {

//   const [orders, setOrders] = useState({
//     newOrders: [
//       {
//         _id: "672283fed6ac777264b2aaff",
//         customerName: "John Doe",
//         address: "387 New Estate St, Toronto, ON",
//         order_date: "2024-09-30",
//         total_amount: 120.99,
//         status: "Pending",
//       },
//     ],
//     preparing: [
//       {
//         _id: "64b8f9f84f1e2d5a089f07a1",
//         customerName: "Jane Smith",
//         address: "45 Maple Ave, Vancouver, BC",
//         order_date: "2024-09-29",
//         total_amount: 45.50,
//         status: "Preparing",
//       },
//     ],
//     readyForDelivery: [
//       {
//         _id: "64e283fed7ac777264b2bbcd",
//         customerName: "Michael Johnson",
//         address: "789 Pine St, Calgary, AB",
//         order_date: "2024-09-25",
//         total_amount: 89.99,
//         status: "Ready for Delivery",
//       },
//     ],
//   });

//   const navigate = useNavigate();

//   // Fetch orders from the database and update state
//   const fetchOrders = useCallback(async () => {
//     try {
//       const response = await fetch('http://localhost:8800/api/orders');
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const fetchedOrders = await response.json();

//       const newFetchedOrders = fetchedOrders.filter(order => order.status === 'Pending');
//       const preparingFetchedOrders = fetchedOrders.filter(order => order.status === 'Preparing');
//       const readyForDeliveryFetchedOrders = fetchedOrders.filter(order => order.status === 'Ready for Delivery');

//       setOrders({
//         newOrders: newFetchedOrders,
//         preparing: preparingFetchedOrders,
//         readyForDelivery: readyForDeliveryFetchedOrders,
//       });
//     } catch (error) {
//       console.error("Error fetching orders:", error);
//     }
//   }, []);

//   useEffect(() => {
//     fetchOrders();
//     const interval = setInterval(fetchOrders, 5000); // Polling every 5 seconds
//     return () => clearInterval(interval);
//   }, [fetchOrders]);

//   const handleStatusChange = async (e, currentGroup, orderId) => {
//     const newStatus = e.target.value;
//     const orderToUpdate = orders[currentGroup].find(order => order._id === orderId);

//     if (orderToUpdate) {
//       orderToUpdate.status = newStatus;
//       const updatedCurrentGroup = orders[currentGroup].filter(order => order._id !== orderId);

//       let newGroup;
//       switch (newStatus) {
//         case "Pending":
//           newGroup = "newOrders";
//           break;
//         case "Preparing":
//           newGroup = "preparing";
//           break;
//         case "Ready for Delivery":
//           newGroup = "readyForDelivery";
//           break;
//         case "Delivered":
//           const deliveredOrders = JSON.parse(localStorage.getItem('deliveredOrders')) || [];
//           localStorage.setItem('deliveredOrders', JSON.stringify([...deliveredOrders, orderToUpdate]));
//           navigate("/admin/delivery");
//           return;
//         default:
//           newGroup = "newOrders";
//       }

//       const updatedNewGroup = [...orders[newGroup], orderToUpdate];
//       setOrders({
//         ...orders,
//         [currentGroup]: updatedCurrentGroup,
//         [newGroup]: updatedNewGroup,
//       });

//       // Update order status in the backend
//       try {
//         await fetch(`http://localhost:8800/api/orders/${orderId}`, {
//           method: 'PUT',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ status: newStatus }),
//         });
//       } catch (error) {
//         console.error("Error updating order status:", error);
//       }
//     }
//   };

//   const handleEdit = (orderId) => {
//     alert(`Edit order with ID: ${orderId}`);
//   };

//   const handleCancelRefund = async (orderId, group) => {
//     try {
//       const response = await fetch(`http://localhost:8800/api/order/${orderId}`, {
//         method: 'DELETE',
//       });
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       // Remove the order from the UI
//       setOrders((prevOrders) => ({
//         ...prevOrders,
//         [group]: prevOrders[group].filter(order => order._id !== orderId),
//       }));
//     } catch (error) {
//       console.error("Error canceling/refunding order:", error);
//     }
//   };

//   const renderOrderGroup = (groupTitle, group) => (
//     <div className="orderGroup">
//       <h2 className="orderGroupTitle">{groupTitle}</h2>
//       {orders[group].map(order => (
//         <div key={order._id} className="tableRow">
//           <div className="tableItem">{order._id}</div>
//           <div className="tableItem">
//             <div>{order.customerName}</div>
//             <div>{order.address}</div>
//           </div>
//           <div className="tableItem">{new Date(order.order_date).toLocaleDateString()}</div>
//           <div className="tableItem">${order.total_amount.toFixed(2)}</div>
//           <div className="tableItem">
//             <select
//               value={order.status}
//               onChange={(e) => handleStatusChange(e, group, order._id)}
//             >
//               <option value="Pending">Pending</option>
//               <option value="Preparing">Preparing</option>
//               <option value="Ready for Delivery">Ready for Delivery</option>
//               <option value="Delivered">Delivered</option>
//             </select>
//           </div>
//           <div className="tableItem actions">
//             <button className="editBtn" onClick={() => handleEdit(order._id)}>Edit</button>
//             <button className="cancelBtn" onClick={() => handleCancelRefund(order._id, group)}>Cancel/Refund</button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );

//   return (
//     <div className="orderManagement">
//       <div className="orderManagementContainer">
//         <div className="content">
//           <div className="tableHeader">
//             <div className="tableItem">Bill No.</div>
//             <div className="tableItem">Ordered By</div>
//             <div className="tableItem">Date</div>
//             <div className="tableItem">Total</div>
//             <div className="tableItem">Status</div>
//             <div className="tableItem actionsTitle">Actions</div>
//           </div>
//           {renderOrderGroup("New Orders", "newOrders")}
//           {renderOrderGroup("Preparing Orders", "preparing")}
//           {renderOrderGroup("Ready for Delivery Orders", "readyForDelivery")}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderManagement;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './OrderManagement.scss';

// const OrderManagement = () => {
//   const [orders, setOrders] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [discountModalVisible, setDiscountModalVisible] = useState(false);
//   const [discountDetails, setDiscountDetails] = useState({
//     discount_type: '',
//     discount_value: '',
//     start_date: '',
//     end_date: ''
//   });
//   const [assigningDiscount, setAssigningDiscount] = useState(false);
//   const [discountError, setDiscountError] = useState(null);

//   // Fetch orders on component mount
//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await axios.get('http://localhost:8800/api/orders/all');
//         setOrders(response.data.orders);
//       } catch (error) {
//         console.error("Error fetching orders", error);
//         setError("Failed to load orders.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchOrders();
//   }, []);

//   // Open discount modal for a specific order
//   const openDiscountModal = (order) => {
//     setSelectedOrder(order);
//     setDiscountModalVisible(true);
//   };

//   const closeDiscountModal = () => {
//     setDiscountDetails({
//       discount_type: '',
//       discount_value: '',
//       start_date: '',
//       end_date: ''
//     });
//     setDiscountModalVisible(false);
//     setDiscountError(null);
//   };

//   // Handle discount assignment to a specific order
//   const handleAssignDiscount = async () => {
//     setAssigningDiscount(true);
//     setDiscountError(null);

//     try {
//       await axios.post(`http://localhost:8800/api/orders/${selectedOrder._id}/apply-discount`, {
//         discount_type: discountDetails.discount_type,
//         discount_value: Number(discountDetails.discount_value),
//         start_date: discountDetails.start_date,
//         end_date: discountDetails.end_date,
//       });
//       alert('Discount assigned successfully to order');
//       closeDiscountModal();
//     } catch (error) {
//       console.error("Error assigning discount:", error.response ? error.response.data : error.message);
//       setDiscountError(error.response?.data?.message || 'Failed to assign discount. Please check your inputs and try again.');
//     } finally {
//       setAssigningDiscount(false);
//     }
//   };

//   return (
//     <div className="orders-container">
//       <h2>Orders</h2>
//       {loading ? (
//         <p>Loading orders...</p>
//       ) : error ? (
//         <p className="error-message">{error}</p>
//       ) : (
//         <div>
//           <section className="order-section">
//             <h3>All Orders</h3>
//             <table>
//               <thead>
//                 <tr>
//                   <th>Order ID</th>
//                   <th>Customer Name</th>
//                   <th>User Email</th>
//                   <th>Order Date</th>
//                   <th>Total Amount</th>
//                   <th>Status</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {orders.map((order) => (
//                   <tr key={order._id}>
//                     <td>{order._id}</td>
//                     <td>{order.customerName}</td>
//                     <td>{order.user?.email}</td> {/* Assuming `user.email` is provided */}
//                     <td>{new Date(order.order_date).toLocaleDateString()}</td>
//                     <td>${order.total_amount.toFixed(2)}</td>
//                     <td>{order.status}</td>
//                     <td>
//                       <button onClick={() => openDiscountModal(order)}>Assign Discount</button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </section>

//           {/* Discount assignment modal */}
//           {discountModalVisible && (
//             <div className="modal3">
//               <div className="modal3-content">
//                 <h3>Assign Discount to Order {selectedOrder && selectedOrder._id}</h3>
//                 <label>
//                   Discount Type:
//                   <select
//                     value={discountDetails.discount_type}
//                     onChange={(e) => setDiscountDetails({ ...discountDetails, discount_type: e.target.value })}
//                   >
//                     <option value="percentage">Percentage</option>
//                     <option value="fixed">Fixed Amount</option>
//                   </select>
//                 </label>
//                 <label>
//                   Discount Value:
//                   <input
//                     type="number"
//                     value={discountDetails.discount_value}
//                     onChange={(e) => setDiscountDetails({ ...discountDetails, discount_value: e.target.value })}
//                   />
//                 </label>
//                 <label>
//                   Start Date:
//                   <input
//                     type="date"
//                     value={discountDetails.start_date}
//                     onChange={(e) => setDiscountDetails({ ...discountDetails, start_date: e.target.value })}
//                   />
//                 </label>
//                 <label>
//                   End Date:
//                   <input
//                     type="date"
//                     value={discountDetails.end_date}
//                     onChange={(e) => setDiscountDetails({ ...discountDetails, end_date: e.target.value })}
//                   />
//                 </label>
//                 {discountError && <p className="error-message">{discountError}</p>}
//                 <button onClick={handleAssignDiscount} disabled={assigningDiscount}>
//                   {assigningDiscount ? 'Assigning...' : 'Assign Discount'}
//                 </button>
//                 <button onClick={closeDiscountModal}>Cancel</button>
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrderManagement;


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
        const response = await axios.get("http://localhost:8800/api/orders/all");
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
      const response = await axios.put(`http://localhost:8800/api/order/${orderId}`, { status: newStatus });
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
  
        return updatedOrders;
      });
    } catch (error) {
      console.error("Failed to update order status:", error.response?.data || error.message);
      alert("Failed to update order status.");
    }
  };      

  const handleCancel = async (orderId) => {
    try {
      // Delete the order via API
      await axios.delete(`http://localhost:8800/api/order/${orderId}`);
      alert("Order canceled successfully.");
  
      // Remove the canceled order from state
      setOrders((prevOrders) => {
        const updatedOrders = { ...prevOrders };
        Object.keys(updatedOrders).forEach((statusKey) => {
          updatedOrders[statusKey] = updatedOrders[statusKey].filter((order) => order.id !== orderId);
        });
        return updatedOrders;
      });
    } catch (error) {
      console.error("Error canceling order:", error);
      alert("Failed to cancel order.");
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
      <button className="refresh-button" onClick={() => window.location.reload()}>Refresh Orders</button>

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

  return (
    <div className="order-row">
      <span>{order.id}</span>
      <span>{order.user ? `${order.user.firstName} ${order.user.lastName}` : 'Unknown User'}</span>
      <span>{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}</span>
      <span>${order.total_amount.toFixed(2)}</span>
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
      </span>
    </div>
  );
};

export default OrderManagement;
