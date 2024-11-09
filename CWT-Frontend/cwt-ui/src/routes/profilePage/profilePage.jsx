import React, { useState, useEffect, useContext } from 'react';
import './ProfilePage.scss';
import apiRequest from '../../lib/apiRequest';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const ProfilePage = () => {
  const { updateUser, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      updateUser(null);
      navigate("/login");
    } catch (err) {
      console.error("Error logging out:", err);
      alert("Failed to log out. Please try again later.");
    }
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        const ordersResponse = await apiRequest.get('/api/user/orders');
        setOrderHistory(ordersResponse.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching profile data:', err);
        setError('Failed to load profile information. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchProfileData();
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      await apiRequest.put('/api/user/profile', currentUser);
      alert('Profile updated successfully!');
      setEditMode(false);
    } catch (error) {
      console.error('Update failed:', error);
      alert(`Failed to update profile: ${error.response?.data?.message || 'Unknown error'}`);
    }
  };

  return (
    currentUser && (
      <div className="profile-page">
        <div className="profile-header">
          <h2>My Profile</h2>
          <button onClick={() => setEditMode(!editMode)}>
            {editMode ? 'Cancel' : 'Edit'}
          </button>
        </div>

        <div className="profile-info">
          <label>Name:</label>
          {editMode ? (
            <input
              type="text"
              name="firstName"
              value={currentUser.firstName || ''}
              onChange={handleChange}
            />
          ) : (
            <p>{`${currentUser.firstName} ${currentUser.lastName}`}</p>
          )}

          <label>Email:</label>
          <p>{currentUser.email}</p>

          <label>Phone:</label>
          {editMode ? (
            <input
              type="text"
              name="phoneNumber"
              value={currentUser.phoneNumber || ''}
              onChange={handleChange}
            />
          ) : (
            <p>{currentUser.phoneNumber}</p>
          )}

          <label>Address:</label>
          {editMode ? (
            <input
              type="text"
              name="city"
              value={currentUser.city || ''}
              onChange={handleChange}
            />
          ) : (
            <p>{currentUser.city}</p>
          )}

          {editMode && <button onClick={handleUpdate}>Save</button>}
        </div>

        <div className="order-history">
          <h3>Order History</h3>
          {loading ? (
            <p>Loading order history...</p>
          ) : orderHistory.length > 0 ? (
            <ul>
              {orderHistory.map((order) => (
                <li key={order.id}>
                  <p>Order ID: {order.id}</p>
                  <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                  <p>Total: ${order.total}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No orders found</p>
          )}
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    )
  );
};

export default ProfilePage;
