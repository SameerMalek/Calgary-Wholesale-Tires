import React, { useState, useEffect } from 'react';
import './ProfilePage.scss'; // Import the SCSS file
import apiRequest from '../../lib/apiRequest';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const navigate = useNavigate();
    const handleLogout = async () => {
        try{
            const res = apiRequest.post("auth/logout");
            localStorage.removeItem("user");
            navigate("/");
        } catch(err){
            console.log(err)
        }
    }
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [orderHistory, setOrderHistory] = useState([]);

  // Fetch user data and order history
  useEffect(() => {
    // Fetch user details
    apiRequest.get('/api/user/profile').then(response => {
      setUserData(response.data);
    });

    // Fetch order history
    apiRequest.get('/api/user/orders').then(response => {
      setOrderHistory(response.data);
    });
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  // Update user data
  const handleUpdate = () => {
    axios.put('/api/user/profile', userData).then(response => {
      alert('Profile updated successfully!');
      setEditMode(false);
    }).catch(error => {
      alert('Failed to update profile.');
    });
  };

  return (
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
          <input type="text" name="name" value={userData.name} onChange={handleChange} />
        ) : (
          <p>{userData.name}</p>
        )}

        <label>Email:</label>
        <p>{userData.email}</p>

        <label>Phone:</label>
        {editMode ? (
          <input type="text" name="phone" value={userData.phone} onChange={handleChange} />
        ) : (
          <p>{userData.phone}</p>
        )}

        <label>Address:</label>
        {editMode ? (
          <input type="text" name="address" value={userData.address} onChange={handleChange} />
        ) : (
          <p>{userData.address}</p>
        )}

        {editMode && <button onClick={handleUpdate}>Save</button>}
      </div>

      <div className="order-history">
        <h3>Order History</h3>
        <ul>
          {orderHistory.length > 0 ? orderHistory.map(order => (
            <li key={order.id}>
              <p>Order ID: {order.id}</p>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
              <p>Total: ${order.total}</p>
            </li>
          )) : (
            <p>No orders found</p>
          )}
        </ul>
      </div>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;
