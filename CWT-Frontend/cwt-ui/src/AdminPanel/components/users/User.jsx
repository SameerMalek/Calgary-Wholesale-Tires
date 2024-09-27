// import React from 'react';
// import { Link } from 'react-router-dom';
// import './User.scss';

// const User = ({ userInfo }) => {
//   // If userInfo is undefined, show a fallback message
//   if (!userInfo) {
//     return <p>No user information available.</p>;
//   }

//   return (
//     <div className="user-table-container">
//       <h2>User Information</h2>
//       <table className="user-table">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Age</th>
//             <th>Location</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>
//               {/* Link to the user's detailed page */}
//               <Link to={`/users/${userInfo.id}`}>
//                 {userInfo.name}
//               </Link>
//             </td>
//             <td>{userInfo.email}</td>
//             <td>{userInfo.age}</td>
//             <td>{userInfo.location}</td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default User;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './User.scss';

const User = ({ userInfo, onApprove, onDecline }) => {
  const [status, setStatus] = useState(null); // Track user status (approved or declined)

  // If userInfo is undefined, show a fallback message
  if (!userInfo) {
    return <p>No user information available.</p>;
  }

  // Handle approve
  const handleApprove = () => {
    setStatus('approved');
    onApprove(userInfo.id); // Call approve callback
  };

  // Handle decline
  const handleDecline = () => {
    setStatus('declined');
    onDecline(userInfo.id); // Call decline callback
  };

  return (
    <div className="user-table-container">
      <h2>User Information</h2>
      {status && <p>User request has been {status}.</p>}
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone</th>
            <th>City</th>
            <th>Province</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Link to={`/users/${userInfo.id}`}>{userInfo.name}</Link>
            </td>
            <td>{userInfo.email}</td>
            <td>{userInfo.address}</td>
            <td>{userInfo.phone}</td>
            <td>{userInfo.city}</td>
            <td>{userInfo.province}</td>
          </tr>
        </tbody>
      </table>

      {/* Approve and Decline buttons */}
      <div className="admin-actions">
        <button className="btn-approve" onClick={handleApprove}>Approve</button>
        <button className="btn-decline" onClick={handleDecline}>Decline</button>
      </div>
    </div>
  );
};

export default User;
