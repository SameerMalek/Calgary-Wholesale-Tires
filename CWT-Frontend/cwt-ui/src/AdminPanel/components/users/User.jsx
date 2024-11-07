import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './user.scss';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8800/api/users'); // Confirmed endpoint
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users", error);
        setError("Failed to load users.");
      } finally {
        setLoading(false); // Stop loading indicator
      }
    };
    fetchUsers();
  }, []);

  // Approve user
  const handleApprove = async (userId) => {
    try {
      await axios.put(`http://localhost:8800/api/auth/users/${userId}/approve`);
      setUsers(users.map(user => user.id === userId ? { ...user, isApproved: true } : user));
    } catch (error) {
      console.error("Error approving user", error);
    }
  };

  // Decline user
  const handleDecline = async (userId) => {
    if (!window.confirm("Are you sure you want to decline this user?")) return;
    try {
      await axios.delete(`http://localhost:8800/api/auth/decline-user/${userId}`);
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error("Error declining user", error);
    }
  };

  return (
    <div>
      <h2>Registered Users</h2>
      {loading ? (
        <p>Loading users...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
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
      )}
    </div>
  );
};

export default Users;
