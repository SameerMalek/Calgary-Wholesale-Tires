// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import './user.scss';

// // const Users = () => {
// //   const [users, setUsers] = useState([]);
// //   const [error, setError] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   // Fetch users on component mount
// //   useEffect(() => {
// //     const fetchUsers = async () => {
// //       try {
// //         const response = await axios.get('http://localhost:8800/api/users'); // Confirmed endpoint
// //         setUsers(response.data);
// //       } catch (error) {
// //         console.error("Error fetching users", error);
// //         setError("Failed to load users.");
// //       } finally {
// //         setLoading(false); // Stop loading indicator
// //       }
// //     };
// //     fetchUsers();
// //   }, []);

// //   // Approve user
// //   const handleApprove = async (userId) => {
// //     try {
// //       await axios.put(`http://localhost:8800/api/auth/users/${userId}/approve`);
// //       setUsers(users.map(user => user.id === userId ? { ...user, isApproved: true } : user));
// //     } catch (error) {
// //       console.error("Error approving user", error);
// //     }
// //   };

// //   // Decline user
// //   const handleDecline = async (userId) => {
// //     if (!window.confirm("Are you sure you want to decline this user?")) return;
// //     try {
// //       await axios.delete(`http://localhost:8800/api/auth/decline-user/${userId}`);
// //       setUsers(users.filter(user => user.id !== userId));
// //     } catch (error) {
// //       console.error("Error declining user", error);
// //     }
// //   };

// //   // Filter users based on approval status
// //   const approvedUsers = users.filter(user => user.isApproved);
// //   const pendingUsers = users.filter(user => !user.isApproved);

// //   return (
// //     <div className="users-container">
// //       <h2>Users</h2>
// //       {loading ? (
// //         <p>Loading users...</p>
// //       ) : error ? (
// //         <p className="error-message">{error}</p>
// //       ) : (
// //         <div>
// //           <section className="user-section">
// //             <h3>Approved Users</h3>
// //             <table>
// //               <thead>
// //                 <tr>
// //                   <th>Name</th>
// //                   <th>Email</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {approvedUsers.map(user => (
// //                   <tr key={user.id}>
// //                     <td>{user.firstName} {user.lastName}</td>
// //                     <td>{user.email}</td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           </section>

// //           <section className="user-section">
// //             <h3>Pending Users</h3>
// //             <table>
// //               <thead>
// //                 <tr>
// //                   <th>Name</th>
// //                   <th>Email</th>
// //                   <th>Actions</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {pendingUsers.map(user => (
// //                   <tr key={user.id}>
// //                     <td>{user.firstName} {user.lastName}</td>
// //                     <td>{user.email}</td>
// //                     <td>
// //                       <button onClick={() => handleApprove(user.id)}>Approve</button>
// //                       <button onClick={() => handleDecline(user.id)}>Decline</button>
// //                     </td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           </section>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Users;

// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import './user.scss';

// // const Users = () => {
// //   const [users, setUsers] = useState([]);
// //   const [error, setError] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [selectedUser, setSelectedUser] = useState(null);
// //   const [discountModalVisible, setDiscountModalVisible] = useState(false);
// //   const [discountDetails, setDiscountDetails] = useState({
// //     discount_type: '',
// //     discount_value: '',
// //     start_date: '',
// //     end_date: ''
// //   });

// //   // Fetch users on component mount
// //   useEffect(() => {
// //     const fetchUsers = async () => {
// //       try {
// //         const response = await axios.get('http://localhost:8800/api/users');
// //         setUsers(response.data);
// //       } catch (error) {
// //         console.error("Error fetching users", error);
// //         setError("Failed to load users.");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchUsers();
// //   }, []);

// //   // Approve user
// //   const handleApprove = async (userId) => {
// //     try {
// //       await axios.put(`http://localhost:8800/api/auth/users/${userId}/approve`);
// //       setUsers(users.map(user => user.id === userId ? { ...user, isApproved: true } : user));
// //     } catch (error) {
// //       console.error("Error approving user", error);
// //     }
// //   };

// //   // Decline user
// //   const handleDecline = async (userId) => {
// //     if (!window.confirm("Are you sure you want to decline this user?")) return;
// //     try {
// //       await axios.delete(`http://localhost:8800/api/auth/decline-user/${userId}`);
// //       setUsers(users.filter(user => user.id !== userId));
// //     } catch (error) {
// //       console.error("Error declining user", error);
// //     }
// //   };

// //   // Handle discount modal visibility
// //   const openDiscountModal = (user) => {
// //     setSelectedUser(user);
// //     setDiscountModalVisible(true);
// //   };

// //   const closeDiscountModal = () => {
// //     setDiscountDetails({
// //       discount_type: '',
// //       discount_value: '',
// //       start_date: '',
// //       end_date: ''
// //     });
// //     setDiscountModalVisible(false);
// //   };

// //   // Handle discount assignment
// //   const handleAssignDiscount = async () => {
// //     try {
// //       await axios.post(`http://localhost:8800/api/discount`, {
// //         user_id: selectedUser.id,
// //         ...discountDetails
// //       });
// //       alert('Discount assigned successfully');
// //       closeDiscountModal();
// //     } catch (error) {
// //       console.error("Error assigning discount", error);
// //       alert('Failed to assign discount');
// //     }
// //   };

// //   // Filter users based on approval status
// //   const approvedUsers = users.filter(user => user.isApproved);
// //   const pendingUsers = users.filter(user => !user.isApproved);

// //   return (
// //     <div className="users-container">
// //       <h2>Users</h2>
// //       {loading ? (
// //         <p>Loading users...</p>
// //       ) : error ? (
// //         <p className="error-message">{error}</p>
// //       ) : (
// //         <div>
// //           <section className="user-section">
// //             <h3>Approved Users</h3>
// //             <table>
// //               <thead>
// //                 <tr>
// //                   <th>Name</th>
// //                   <th>Email</th>
// //                   <th>Actions</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {approvedUsers.map(user => (
// //                   <tr key={user.id}>
// //                     <td>{user.firstName} {user.lastName}</td>
// //                     <td>{user.email}</td>
// //                     <td>
// //                       <button onClick={() => openDiscountModal(user)}>Assign Discount</button>
// //                     </td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           </section>

// //           <section className="user-section">
// //             <h3>Pending Users</h3>
// //             <table>
// //               <thead>
// //                 <tr>
// //                   <th>Name</th>
// //                   <th>Email</th>
// //                   <th>Actions</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {pendingUsers.map(user => (
// //                   <tr key={user.id}>
// //                     <td>{user.firstName} {user.lastName}</td>
// //                     <td>{user.email}</td>
// //                     <td>
// //                       <button onClick={() => handleApprove(user.id)}>Approve</button>
// //                       <button onClick={() => handleDecline(user.id)}>Decline</button>
// //                     </td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           </section>

// //           {discountModalVisible && (
// //             <div className="modal">
// //               <div className="modal-content">
// //                 <h3>Assign Discount to {selectedUser.firstName} {selectedUser.lastName}</h3>
// //                 <label>
// //                   Discount Type:
// //                   <select
// //                     value={discountDetails.discount_type}
// //                     onChange={(e) => setDiscountDetails({ ...discountDetails, discount_type: e.target.value })}
// //                   >
// //                     <option value="percentage">Percentage</option>
// //                     <option value="fixed">Fixed Amount</option>
// //                   </select>
// //                 </label>
// //                 <label>
// //                   Discount Value:
// //                   <input
// //                     type="number"
// //                     value={discountDetails.discount_value}
// //                     onChange={(e) => setDiscountDetails({ ...discountDetails, discount_value: e.target.value })}
// //                   />
// //                 </label>
// //                 <label>
// //                   Start Date:
// //                   <input
// //                     type="date"
// //                     value={discountDetails.start_date}
// //                     onChange={(e) => setDiscountDetails({ ...discountDetails, start_date: e.target.value })}
// //                   />
// //                 </label>
// //                 <label>
// //                   End Date:
// //                   <input
// //                     type="date"
// //                     value={discountDetails.end_date}
// //                     onChange={(e) => setDiscountDetails({ ...discountDetails, end_date: e.target.value })}
// //                   />
// //                 </label>
// //                 <button onClick={handleAssignDiscount}>Assign Discount</button>
// //                 <button onClick={closeDiscountModal}>Cancel</button>
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Users;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './user.scss';

// const Users = () => {
//   const [users, setUsers] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [discountModalVisible, setDiscountModalVisible] = useState(false);
//   const [discountDetails, setDiscountDetails] = useState({
//     discount_type: '',
//     discount_value: '',
//     start_date: '',
//     end_date: ''
//   });
//   const [assigningDiscount, setAssigningDiscount] = useState(false);
//   const [discountError, setDiscountError] = useState(null);

//   // Fetch users on component mount
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get('http://localhost:8800/api/users');
//         setUsers(response.data);
//       } catch (error) {
//         console.error("Error fetching users", error);
//         setError("Failed to load users.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUsers();
//   }, []);

//   // Approve user
//   const handleApprove = async (userId) => {
//     try {
//       await axios.put(`http://localhost:8800/api/auth/users/${userId}/approve`);
//       setUsers(users.map(user => user.id === userId ? { ...user, isApproved: true } : user));
//     } catch (error) {
//       console.error("Error approving user", error);
//     }
//   };

//   // Decline user
//   const handleDecline = async (userId) => {
//     if (!window.confirm("Are you sure you want to decline this user?")) return;
//     try {
//       await axios.delete(`http://localhost:8800/api/auth/decline-user/${userId}`);
//       setUsers(users.filter(user => user.id !== userId));
//     } catch (error) {
//       console.error("Error declining user", error);
//     }
//   };

//   // Handle discount modal visibility
//   const openDiscountModal = (user) => {
//     setSelectedUser(user);
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

//   // Handle discount assignment
//   const handleAssignDiscount = async () => {
//     setAssigningDiscount(true);
//     setDiscountError(null);

//     try {
//       await axios.post(`http://localhost:8800/api/discount`, {
//         user_id: selectedUser.id,
//         ...discountDetails
//       });
//       alert('Discount assigned successfully');
//       closeDiscountModal();
//     } catch (error) {
//       console.error("Error assigning discount", error);
//       setDiscountError('Failed to assign discount. Please check your inputs and try again.');
//     } finally {
//       setAssigningDiscount(false);
//     }
//   };

//   // Filter users based on approval status
//   const approvedUsers = users.filter(user => user.isApproved);
//   const pendingUsers = users.filter(user => !user.isApproved);

//   return (
//     <div className="users-container">
//       <h2>Users</h2>
//       {loading ? (
//         <p>Loading users...</p>
//       ) : error ? (
//         <p className="error-message">{error}</p>
//       ) : (
//         <div>
//           <section className="user-section">
//             <h3>Approved Users</h3>
//             <table>
//               <thead>
//                 <tr>
//                   <th>Name</th>
//                   <th>Email</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {approvedUsers.map(user => (
//                   <tr key={user.id}>
//                     <td>{user.firstName} {user.lastName}</td>
//                     <td>{user.email}</td>
//                     <td>
//                       <button onClick={() => openDiscountModal(user)}>Assign Discount</button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </section>

//           <section className="user-section">
//             <h3>Pending Users</h3>
//             <table>
//               <thead>
//                 <tr>
//                   <th>Name</th>
//                   <th>Email</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {pendingUsers.map(user => (
//                   <tr key={user.id}>
//                     <td>{user.firstName} {user.lastName}</td>
//                     <td>{user.email}</td>
//                     <td>
//                       <button onClick={() => handleApprove(user.id)}>Approve</button>
//                       <button onClick={() => handleDecline(user.id)}>Decline</button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </section>

//           {discountModalVisible && (
//             <div className="modal">
//               <div className="modal-content">
//                 <h3>Assign Discount to {selectedUser.firstName} {selectedUser.lastName}</h3>
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

// export default Users;

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./User.scss";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [discountModalVisible, setDiscountModalVisible] = useState(false);
  const [discountDetails, setDiscountDetails] = useState({
    discount_type: "",
    discount_value: "",
    start_date: "",
    end_date: "",
  });
  const [assigningDiscount, setAssigningDiscount] = useState(false);
  const [discountError, setDiscountError] = useState(null);
  const [userOrders, setUserOrders] = useState([]);
  const [viewingOrders, setViewingOrders] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://calgary-wholesale-tires.onrender.com/api/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users", error);
        setError("Failed to load users.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Approve user
  const handleApprove = async (userId) => {
    try {
      await axios.put(`https://calgary-wholesale-tires.onrender.com/api/auth/users/${userId}/approve`);
      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, isApproved: true } : user
        )
      );
    } catch (error) {
      console.error("Error approving user", error);
    }
  };

  // Decline user
  const handleDecline = async (userId) => {
    if (!window.confirm("Are you sure you want to decline this user?")) return;
    try {
      await axios.delete(
        `https://calgary-wholesale-tires.onrender.com/api/auth/decline-user/${userId}`
      );
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error declining user", error);
    }
  };

  // Fetch orders for a selected user
  const handleViewOrders = async (user) => {
    try {
      const response = await axios.get(
        `https://calgary-wholesale-tires.onrender.com/api/orders/user/${user.id}/orders`
      );
      console.log(response.data);
      setUserOrders(response.data.orders);
      setSelectedUser(user);
      setViewingOrders(true);
    } catch (error) {
      console.error("Error fetching user orders", error);
    }
  };

  // Close orders view
  const closeOrderView = () => {
    setViewingOrders(false);
    setUserOrders([]);
    setSelectedUser(null);
  };

  // Open discount modal for a specific order
  const openDiscountModal = (order) => {
    setSelectedOrder(order);
    setDiscountModalVisible(true);
  };

  const closeDiscountModal = () => {
    setDiscountDetails({
      discount_type: "",
      discount_value: "",
      start_date: "",
      end_date: "",
    });
    setDiscountModalVisible(false);
    setDiscountError(null);
  };

  // Handle discount assignment to a specific order
  const handleAssignDiscount = async () => {
    setAssigningDiscount(true);
    setDiscountError(null);

    try {
      const response = await axios.post(
        `https://calgary-wholesale-tires.onrender.com/api/orders/${selectedOrder.id}/apply-discount`,
        {
          discount_type: discountDetails.discount_type,
          discount_value: Number(discountDetails.discount_value),
          start_date: discountDetails.start_date,
          end_date: discountDetails.end_date,
        }
      );
      alert("Discount assigned successfully to order");
      closeDiscountModal();
    } catch (error) {
      console.error(
        "Error assigning discount:",
        error.response ? error.response.data : error.message
      );
      setDiscountError(
        error.response?.data?.message ||
          "Failed to assign discount. Please check your inputs and try again."
      );
    } finally {
      setAssigningDiscount(false);
    }
  };

  // Filter users based on approval status
  const approvedUsers = users.filter((user) => user.isApproved);
  const pendingUsers = users.filter((user) => !user.isApproved);

  return (
    <div className="users-container">
      <h2>Users</h2>
      {loading ? (
        <p>Loading users...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div>
           <section className="user-section">
            <h3>Pending Users</h3>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingUsers.map((user) => (
                  <tr key={user.id}>
                    <td>
                      {user.firstName} {user.lastName}
                    </td>
                    <td>{user.email}</td>
                    <td>
                      <button onClick={() => handleApprove(user.id)}>
                        Approve
                      </button>
                      <button onClick={() => handleDecline(user.id)}>
                        Decline
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="user-section">
            <h3>Approved Users</h3>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {approvedUsers.map((user) => (
                  <tr key={user.id}>
                    <td>
                      {user.firstName} {user.lastName}
                    </td>
                    <td>{user.email}</td>
                    <td>
                      <button onClick={() => handleViewOrders(user)}>
                        View Orders
                      </button>
                      <button onClick={() => openDiscountModal(user)}>
                        Assign Discount
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Order view modal */}
          {viewingOrders && (
            <div className="modal3">
              <div className="modal3-content">
                <h3>
                  Orders for {selectedUser.firstName} {selectedUser.lastName}
                </h3>
                <table>
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Total Amount</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userOrders.map((order) => (
                      <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.total_amount}</td>
                        <td>
                          <button onClick={() => openDiscountModal(order)}>
                            Adjust Discount
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button onClick={closeOrderView}>Close</button>
              </div>
            </div>
          )}

          {/* Discount assignment modal */}
          {discountModalVisible && (
            <div className="modal3">
              <div className="modal3-content">
                <h3>
                  Assign Discount to Order {selectedOrder && selectedOrder.id}
                </h3>
                <label>
                  Discount Type:
                  <select
                    value={discountDetails.discount_type}
                    onChange={(e) =>
                      setDiscountDetails({
                        ...discountDetails,
                        discount_type: e.target.value,
                      })
                    }
                  >
                    <option value="percentage">Percentage</option>
                    <option value="fixed">Fixed Amount</option>
                  </select>
                </label>
                <label>
                  Discount Value:
                  <input
                    type="number"
                    value={discountDetails.discount_value}
                    onChange={(e) =>
                      setDiscountDetails({
                        ...discountDetails,
                        discount_value: e.target.value,
                      })
                    }
                  />
                </label>
                <label>
                  Start Date:
                  <input
                    type="date"
                    value={discountDetails.start_date}
                    onChange={(e) =>
                      setDiscountDetails({
                        ...discountDetails,
                        start_date: e.target.value,
                      })
                    }
                  />
                </label>
                <label>
                  End Date:
                  <input
                    type="date"
                    value={discountDetails.end_date}
                    onChange={(e) =>
                      setDiscountDetails({
                        ...discountDetails,
                        end_date: e.target.value,
                      })
                    }
                  />
                </label>
                {discountError && (
                  <p className="error-message">{discountError}</p>
                )}
                <button
                  onClick={handleAssignDiscount}
                  disabled={assigningDiscount}
                >
                  {assigningDiscount ? "Assigning..." : "Assign Discount"}
                </button>
                <button onClick={closeDiscountModal}>Cancel</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Users;
