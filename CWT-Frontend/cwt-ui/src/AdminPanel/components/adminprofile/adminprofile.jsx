import React, { useState } from 'react';
import './adminprofile.scss';

const AdminProfile = () => {
  // Initial profile data
  const [profile, setProfile] = useState({
    name: 'Admin User',
    email: 'admin@example.com',
    contact: '123-456-7890',
    position: 'Administrator',
    location: 'Calgary, Alberta',
    password: '',
    confirmPassword: ''
  });

  // Handle input changes
  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (profile.password !== profile.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    alert('Profile updated successfully!');
  };

  return (
    <div className="admin-profile">
      <div className="profile-header">
        <h1>Admin Profile</h1>
        <p>Manage your profile details</p>
      </div>
      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label>Contact</label>
          <input
            type="text"
            name="contact"
            value={profile.contact}
            onChange={handleChange}
            placeholder="Enter your contact number"
          />
        </div>
        <div className="form-group">
          <label>Position</label>
          <input
            type="text"
            name="position"
            value={profile.position}
            onChange={handleChange}
            disabled
          />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={profile.location}
            onChange={handleChange}
            disabled
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={profile.password}
            onChange={handleChange}
            placeholder="Enter new password"
          />
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={profile.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm new password"
          />
        </div>
        <button type="submit" className="btn">Update Profile</button>
      </form>
    </div>
  );
};

export default AdminProfile;
