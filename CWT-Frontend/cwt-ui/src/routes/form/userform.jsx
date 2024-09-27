// import React from 'react';
// import './userform.scss';

// export default function UserForm() {
//   return (
//     <div className="user-form-container">
//       <div className="form-wrapper">
//         <h2>To open an account please fill out the following form</h2>

//         {/* Business Details */}
//         <div className="form-section">
//           <h3>Business Details*</h3>
//           <div className="form-group">
//             <label htmlFor="company-name">Company Name*</label>
//             <input id="company-name" type="text" placeholder="Enter company name" required />
//           </div>
//           <div className="form-row">
//             <div className="form-group">
//               <label htmlFor="address">Address*</label>
//               <input id="address" type="text" placeholder="Enter address" required />
//             </div>
//             <div className="form-group">
//               <label htmlFor="city">City*</label>
//               <input id="city" type="text" placeholder="Enter city" required />
//             </div>
//             <div className="form-group">
//               <label htmlFor="province">Province*</label>
//               <select id="province" required>
//                 <option value="">Select province</option>
//                 <option value="AB">Alberta</option>
//                 <option value="BC">British Columbia</option>
//                 <option value="MB">Manitoba</option>
//                 <option value="NB">New Brunswick</option>
//                 <option value="NL">Newfoundland and Labrador</option>
//                 <option value="NS">Nova Scotia</option>
//                 <option value="ON">Ontario</option>
//                 <option value="PE">Prince Edward Island</option>
//                 <option value="QC">Quebec</option>
//                 <option value="SK">Saskatchewan</option>
//                 <option value="NT">Northwest Territories</option>
//                 <option value="NU">Nunavut</option>
//                 <option value="YT">Yukon</option>
//               </select>
//             </div>
//           </div>
//           <div className="form-row">
//             <div className="form-group">
//               <label htmlFor="postal-code">Postal Code*</label>
//               <input id="postal-code" type="text" placeholder="Enter postal code" required />
//             </div>
//             <div className="form-group">
//               <label htmlFor="phone-number">Phone no.*</label>
//               <input
//                 id="phone-number"
//                 type="tel"
//                 placeholder="Enter phone number"
//                 pattern="[0-9]{10}"
//                 title="Enter a 10-digit phone number"
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="email">Email Id*</label>
//               <input id="email" type="email" placeholder="Enter email id" required />
//             </div>
//           </div>
//         </div>

//         {/* Additional Details */}
//         <div className="form-section">
//           <h3>Additional Details*</h3>
//           <div className="form-group">
//             <label>Are you the company's owner?</label>
//             <div className="radio-group">
//               <label>
//                 <input type="radio" name="owner" value="yes" required />
//                 Yes
//               </label>
//               <label>
//                 <input type="radio" name="owner" value="no" />
//                 No
//               </label>
//             </div>
//           </div>
//           <div className="form-row">
//             <div className="form-group">
//               <label htmlFor="firstname">Firstname*</label>
//               <input id="firstname" type="text" placeholder="Enter first name" required />
//             </div>
//             <div className="form-group">
//               <label htmlFor="lastname">Lastname*</label>
//               <input id="lastname" type="text" placeholder="Enter last name" required />
//             </div>
//           </div>
//           <div className="form-group">
//             <label htmlFor="operation-year">In operation since:</label>
//             <input id="operation-year" type="text" placeholder="Enter year of operation" />
//           </div>
//           <div className="form-group">
//             <label htmlFor="annual-purchase">Annual purchased planned:</label>
//             <input id="annual-purchase" type="text" placeholder="Enter annual purchase plan" />
//           </div>
//           <div className="form-group">
//             <label htmlFor="comments">Comments:</label>
//             <textarea id="comments" rows="5" placeholder="Enter any comments"></textarea>
//           </div>
//         </div>

//         {/* Submit Button */}
//         <div className="form-group">
//           <button type="submit" className="btn-submit">Submit</button>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from 'react';
import './userform.scss';

export default function UserForm() {
  const [formData, setFormData] = useState({
    companyName: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
    phoneNumber: '',
    email: '',
    firstName: '',
    lastName: '',
    isOwner: false,
    status: 'Pending', // Default status for new requests
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save form data with status "Pending"
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(formData);
    localStorage.setItem('users', JSON.stringify(users));

    alert('User request submitted successfully!');
  };

  return (
    <div className="user-form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-wrapper">
          <h2>Create a New Account</h2>

          <div className="form-group">
            <label htmlFor="companyName">Company Name*</label>
            <input
              id="companyName"
              name="companyName"
              type="text"
              placeholder="Enter company name"
              value={formData.companyName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address*</label>
            <input
              id="address"
              name="address"
              type="text"
              placeholder="Enter address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="city">City*</label>
            <input
              id="city"
              name="city"
              type="text"
              placeholder="Enter city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="province">Province*</label>
            <select
              id="province"
              name="province"
              value={formData.province}
              onChange={handleChange}
              required
            >
              <option value="">Select province</option>
              <option value="AB">Alberta</option>
              <option value="BC">British Columbia</option>
              <option value="MB">Manitoba</option>
              {/* Add other provinces as options */}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="postalCode">Postal Code*</label>
            <input
              id="postalCode"
              name="postalCode"
              type="text"
              placeholder="Enter postal code"
              value={formData.postalCode}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number*</label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              placeholder="Enter phone number"
              pattern="[0-9]{10}"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email*</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="firstName">First Name*</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              placeholder="Enter first name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name*</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Enter last name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="isOwner">Are you the owner?</label>
            <input
              id="isOwner"
              name="isOwner"
              type="checkbox"
              checked={formData.isOwner}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn-submit">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
}