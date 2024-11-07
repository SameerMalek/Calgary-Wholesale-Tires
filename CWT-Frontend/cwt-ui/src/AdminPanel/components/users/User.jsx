// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import './user.scss';

// const User = ({ userInfo, onApprove, onDecline }) => {
//   const [status, setStatus] = useState(null); // Track user status (approved or declined)

//   // If userInfo is undefined, show a fallback message
//   if (!userInfo) {
//     return <p>No user information available.</p>;
//   }

//   // Handle approve
//   const handleApprove = () => {
//     setStatus('approved');
//     onApprove(userInfo.id); // Call approve callback
//   };

//   // Handle decline
//   const handleDecline = () => {
//     setStatus('declined');
//     onDecline(userInfo.id); // Call decline callback
//   };

//   return (
//     <div className="user-table-container">
//       <h2>User Information</h2>
//       {status && <p>User request has been {status}.</p>}
//       <table className="user-table">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Address</th>
//             <th>Phone</th>
//             <th>City</th>
//             <th>Province</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>
//               <Link to={`/users/${userInfo.id}`}>{userInfo.name}</Link>
//             </td>
//             <td>{userInfo.email}</td>
//             <td>{userInfo.address}</td>
//             <td>{userInfo.phone}</td>
//             <td>{userInfo.city}</td>
//             <td>{userInfo.province}</td>
//           </tr>
//         </tbody>
//       </table>

//       {/* Approve and Decline buttons */}
//       <div className="admin-actions">
//         <button className="btn-approve" onClick={handleApprove}>Approve</button>
//         <button className="btn-decline" onClick={handleDecline}>Decline</button>
//       </div>
//     </div>
//   );
// };

// export default User;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './user.scss';

const Users = () => {
  const [users, setUsers] = useState([]);

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users'); // Adjust the URL to match your setup
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };
    fetchUsers();
  }, []);

  // Approve user
  const handleApprove = async (userId) => {
    try {
      await axios.put(`/api/users/${userId}/approve`);
      setUsers(users.map(user => user.id === userId ? { ...user, isApproved: true } : user));
    } catch (error) {
      console.error("Error approving user", error);
    }
  };

  // Decline user
  const handleDecline = async (userId) => {
    try {
      await axios.delete(`/api/users/${userId}/decline`);
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error("Error declining user", error);
    }
  };

  return (
    <div>
      <h2>Registered Users</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.firstName} {user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.isApproved ? "Approved" : "Pending"}</td>
              <td>
                {!user.isApproved && (
                  <>
                    <button onClick={() => handleApprove(user.id)}>Approve</button>
                    <button onClick={() => handleDecline(user.id)}>Decline</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
