// import React, { useState } from 'react';
// import './adminprofile.scss';
// import { CgProfile } from "react-icons/cg";

// const AdminProfile = () => {
//   // Initial profile data with new fields
//   const [profile, setProfile] = useState({
//     name: 'Mahmoud Allaq',
//     email: 'othersamin11@gmail.com',
//     contact: '+1 403 452 4283',
//     position: 'Owner', // Added position field
//     location: 'Calgary, Alberta',
//     adminBadge: 'Verified',
//     accessLevel: 'Super Admin',
//     address: '111 42 Ave SW, Calgary, AB T2G 0A4',
//     bio: 'Mahmoud Allaq is the owner of Calgary Wholesale Tires with over 10 years of experience in the tire industry. Starting as a mechanic, his passion for tires led him to establish the business, which is known for excellent customer service and a wide inventory. Mahmoud leverages technology to enhance customer experience, streamline operations, and stay competitive, ensuring his business remains a trusted name in the industry.'
//   });

//   // Handle input changes
//   const handleChange = (e) => {
//     setProfile({
//       ...profile,
//       [e.target.name]: e.target.value
//     });
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert('Profile updated successfully!');
//   };

//   return (
//     <div className="admin-profile">
//       <div className="profile-container">
//         <div className="profile-left">
//           <h2>Owner Profile</h2>
//           <div className="profile-symbol">
//             <CgProfile className="admin-icon" />
//           </div>
//           <div className="profile-description">
//             <h3>Profile Bio</h3>
//             <p>{profile.bio}</p>
//           </div>
//         </div>
//         <div className="profile-right">
//           <h3>Personal Information</h3>
//           <form onSubmit={handleSubmit}>
//             <div className="form-group">
//               <label>Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={profile.name}
//                 onChange={handleChange}
//                 placeholder="Enter your name"
//               />
//             </div>
//             <div className="form-group">
//               <label>Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={profile.email}
//                 onChange={handleChange}
//                 placeholder="Enter your email"
//               />
//             </div>
//             <div className="form-group">
//               <label>Contact</label>
//               <input
//                 type="text"
//                 name="contact"
//                 value={profile.contact}
//                 onChange={handleChange}
//                 placeholder="Enter your contact number"
//               />
//             </div>
//             <div className="form-group">
//               <label>Address</label>
//               <input
//                 type="text"
//                 name="address"
//                 value={profile.address}
//                 onChange={handleChange}
//                 placeholder="Enter your address"
//               />
//             </div>
//             <div className="form-group">
//               <label>Position</label> {/* Added position field */}
//               <input
//                 type="text"
//                 name="position"
//                 value={profile.position}
//                 disabled
//               />
//             </div>
//             <div className="form-group">
//               <label>Admin Badge/Status</label>
//               <input
//                 type="text"
//                 name="adminBadge"
//                 value={profile.adminBadge}
//                 disabled
//               />
//             </div>
//             <div className="form-group">
//               <label>Access Level</label>
//               <input
//                 type="text"
//                 name="accessLevel"
//                 value={profile.accessLevel}
//                 disabled
//               />
//             </div>
//             <button type="submit" className="btn">Update Profile</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminProfile;


import React, { useState } from 'react';
import './adminprofile.scss';
import { CgProfile } from "react-icons/cg";

const AdminProfile = () => {
  // Initial profile data with new fields
  const [profile, setProfile] = useState({
    name: 'Mahmoud Allaq',
    email: 'othersamin11@gmail.com',
    contact: '+1 403 452 4283',
    position: 'Owner',
    location: 'Calgary, Alberta',
    adminBadge: 'Verified',
    accessLevel: 'Super Admin',
    address: '111 42 Ave SW, Calgary, AB T2G 0A4',
    bio: 'Mahmoud Allaq is the owner of Calgary Wholesale Tires with over 10 years of experience in the tire industry. Starting as a mechanic, his passion for tires led him to establish the business, which is known for excellent customer service and a wide inventory. Mahmoud leverages technology to enhance customer experience, streamline operations, and stay competitive, ensuring his business remains a trusted name in the industry.'
  });

  // State to manage modal visibility
  const [isModalOpen, setModalOpen] = useState(false);

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
    setModalOpen(false);
    alert('Profile updated successfully!');
  };

  // Open modal to edit profile
  const openModal = () => {
    setModalOpen(true);
  };

  // Close modal without saving changes
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
            <h3>Profile Bio</h3>
            <p>{profile.bio}</p>
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

      {/* Modal for editing profile */}
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
