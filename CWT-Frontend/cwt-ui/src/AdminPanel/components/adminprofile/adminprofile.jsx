import React, { useState } from 'react';
import './adminprofile.scss';
import { CgProfile } from "react-icons/cg";

const AdminProfile = () => {
  const [profile, setProfile] = useState({
    name: 'Mahmoud Allaq',
    email: 'othersamin11@gmail.com',
    contact: '+1 403 452 4283',
    position: 'General Director',
    location: 'Calgary, Alberta',
    adminBadge: 'Verified',
    accessLevel: 'Super Admin',
    address: '111 42 Ave SW, Calgary, AB T2G 0A4',
  });

  const [isModalOpen, setModalOpen] = useState(false);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setModalOpen(false);
    alert('Profile updated successfully!');
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="admin-profile">
      <div className="profile-container">
        <div className="profile-left">
          <h2>Owner Profile</h2>
          <div className="profile-symbol">
            <CgProfile className="admin-icon" />
          </div>
          <div className="profile-description">
            <h3 className="profile-name">{profile.name}</h3>
            <h4 className="profile-position">{profile.position}</h4>
            <blockquote className="profile-quote">“The fool doth think he is wise, but the wise man knows himself to be a fool.”</blockquote>
            <p className="profile-bio">{profile.bio}</p>
          </div>
        </div>
        <div className="profile-right">
          <h3>Personal Information</h3>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              disabled
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              disabled
            />
          </div>
          <div className="form-group">
            <label>Contact</label>
            <input
              type="text"
              name="contact"
              value={profile.contact}
              disabled
            />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={profile.address}
              disabled
            />
          </div>
          <div className="form-group">
            <label>Position</label>
            <input
              type="text"
              name="position"
              value={profile.position}
              disabled
            />
          </div>
          <div className="form-group">
            <label>Admin Badge/Status</label>
            <input
              type="text"
              name="adminBadge"
              value={profile.adminBadge}
              disabled
            />
          </div>
          <div className="form-group">
            <label>Access Level</label>
            <input
              type="text"
              name="accessLevel"
              value={profile.accessLevel}
              disabled
            />
          </div>
          <button className="btn" onClick={openModal}>Update Profile</button>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Edit Profile Information</h3>
            <form onSubmit={handleSubmit}>
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
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={profile.address}
                  onChange={handleChange}
                  placeholder="Enter your address"
                />
              </div>
              <button type="submit" className="btn">Save Changes</button>
              <button type="button" className="btn btn-cancel" onClick={closeModal}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProfile;
