import React, { useState, useEffect, useContext } from 'react';
import './ProfilePage.scss';
import apiRequest from '../../lib/apiRequest';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const ProfilePage = () => {
  const { updateUser, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  const handleLogout = async () => {
    try {
      await apiRequest.post('/auth/logout');
      updateUser(null);
      navigate('/login');
    } catch (err) {
      console.error('Error logging out:', err);
      alert('Failed to log out. Please try again later.');
    }
  };

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
          <div className="profile-field">
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
          </div>

          <div className="profile-field">
            <label>Email:</label>
            <p>{currentUser.email}</p>
          </div>

          <div className="profile-field">
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
          </div>

          <div className="profile-field">
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
          </div>

          {editMode && <button onClick={handleUpdate}>Save</button>}
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    )
  );
};

export default ProfilePage;
