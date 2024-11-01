import React, { useState, useEffect } from 'react';
import './ProfilePage.scss'; // Import the SCSS file
import apiRequest from '../../lib/apiRequest';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const ProfilePage = () => {
  const {updateUser, currentUser} = useContext(AuthContext);
  const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
        }
    }, [currentUser, navigate]);

    const handleLogout = async () => {
        try{
            await apiRequest.post("/auth/logout");
            updateUser(null); 
            navigate("/");
        } catch(err){
            console.error("Error logging out:", err);
            alert("Failed to log out. Please try again later.");
        }
    };

  const [userData, setUserData] = useState({
    name: `${currentUser?.firstName} ${currentUser?.lastName}` || '',
    email: currentUser?.email || '',
    phone: currentUser?.phoneNumber || '',
    address: currentUser?.city || ''
  });
  const [editMode, setEditMode] = useState(false);
  const [orderHistory, setOrderHistory] = useState([]);
  const[loading, setLoading] = useState(true);
  const[error, setError] = useState(null);

  // Fetch user data and order history
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        const [profileResponse, ordersResponse] = await Promise.all([
          apiRequest.get('/api/user/profile'),
          apiRequest.get('/api/user/orders')
        ]);

        setUserData(profileResponse.data);
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

  // Handle input change
  const handleChange = (e) => {
    setUserData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));  
  };

  // Update user data
  const handleUpdate = async () => {
    try {
      const response = await apiRequest.put('/api/user/profile', userData);
      alert('Profile updated successfully!');
      setEditMode(false);
      // Optionally update user in context
      updateUser({ ...currentUser, ...userData });
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
          <input type="text" name="name" value={currentUser.firstName} onChange={handleChange} />
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
          <input type="text" name="address" value={userData.city} onChange={handleChange} />
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
  ));
};

export default ProfilePage;
