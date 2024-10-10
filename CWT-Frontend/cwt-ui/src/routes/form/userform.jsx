// // import React from 'react';
// // import './userform.scss';

// // export default function UserForm() {
// //   return (
// //     <div className="user-form-container">
// //       <div className="form-wrapper">
// //         <h2>To open an account please fill out the following form</h2>

// //         {/* Business Details */}
// //         <div className="form-section">
// //           <h3>Business Details*</h3>
// //           <div className="form-group">
// //             <label htmlFor="company-name">Company Name*</label>
// //             <input id="company-name" type="text" placeholder="Enter company name" required />
// //           </div>
// //           <div className="form-row">
// //             <div className="form-group">
// //               <label htmlFor="address">Address*</label>
// //               <input id="address" type="text" placeholder="Enter address" required />
// //             </div>
// //             <div className="form-group">
// //               <label htmlFor="city">City*</label>
// //               <input id="city" type="text" placeholder="Enter city" required />
// //             </div>
// //             <div className="form-group">
// //               <label htmlFor="province">Province*</label>
// //               <select id="province" required>
// //                 <option value="">Select province</option>
// //                 <option value="AB">Alberta</option>
// //                 <option value="BC">British Columbia</option>
// //                 <option value="MB">Manitoba</option>
// //                 <option value="NB">New Brunswick</option>
// //                 <option value="NL">Newfoundland and Labrador</option>
// //                 <option value="NS">Nova Scotia</option>
// //                 <option value="ON">Ontario</option>
// //                 <option value="PE">Prince Edward Island</option>
// //                 <option value="QC">Quebec</option>
// //                 <option value="SK">Saskatchewan</option>
// //                 <option value="NT">Northwest Territories</option>
// //                 <option value="NU">Nunavut</option>
// //                 <option value="YT">Yukon</option>
// //               </select>
// //             </div>
// //           </div>
// //           <div className="form-row">
// //             <div className="form-group">
// //               <label htmlFor="postal-code">Postal Code*</label>
// //               <input id="postal-code" type="text" placeholder="Enter postal code" required />
// //             </div>
// //             <div className="form-group">
// //               <label htmlFor="phone-number">Phone no.*</label>
// //               <input
// //                 id="phone-number"
// //                 type="tel"
// //                 placeholder="Enter phone number"
// //                 pattern="[0-9]{10}"
// //                 title="Enter a 10-digit phone number"
// //                 required
// //               />
// //             </div>
// //             <div className="form-group">
// //               <label htmlFor="email">Email Id*</label>
// //               <input id="email" type="email" placeholder="Enter email id" required />
// //             </div>
// //           </div>
// //         </div>

// //         {/* Additional Details */}
// //         <div className="form-section">
// //           <h3>Additional Details*</h3>
// //           <div className="form-group">
// //             <label>Are you the company's owner?</label>
// //             <div className="radio-group">
// //               <label>
// //                 <input type="radio" name="owner" value="yes" required />
// //                 Yes
// //               </label>
// //               <label>
// //                 <input type="radio" name="owner" value="no" />
// //                 No
// //               </label>
// //             </div>
// //           </div>
// //           <div className="form-row">
// //             <div className="form-group">
// //               <label htmlFor="firstname">Firstname*</label>
// //               <input id="firstname" type="text" placeholder="Enter first name" required />
// //             </div>
// //             <div className="form-group">
// //               <label htmlFor="lastname">Lastname*</label>
// //               <input id="lastname" type="text" placeholder="Enter last name" required />
// //             </div>
// //           </div>
// //           <div className="form-group">
// //             <label htmlFor="operation-year">In operation since:</label>
// //             <input id="operation-year" type="text" placeholder="Enter year of operation" />
// //           </div>
// //           <div className="form-group">
// //             <label htmlFor="annual-purchase">Annual purchased planned:</label>
// //             <input id="annual-purchase" type="text" placeholder="Enter annual purchase plan" />
// //           </div>
// //           <div className="form-group">
// //             <label htmlFor="comments">Comments:</label>
// //             <textarea id="comments" rows="5" placeholder="Enter any comments"></textarea>
// //           </div>
// //         </div>

// //         {/* Submit Button */}
// //         <div className="form-group">
// //           <button type="submit" className="btn-submit">Submit</button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// import React, { useState } from 'react';
// import './userform.scss';

// export default function UserForm({ onSubmitForm }) {
//   // Initialize state to store all form inputs
//   const [formData, setFormData] = useState({
//     companyName: '',
//     address: '',
//     city: '',
//     province: '',
//     postalCode: '',
//     phoneNumber: '',
//     email: '',
//     owner: '',
//     firstName: '',
//     lastName: '',
//     operationYear: '',
//     annualPurchase: '',
//     comments: ''
//   });

//   // Handle form input changes and update state
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.id]: e.target.value,
//     });
//   };

//   // Handle radio buttons for owner status
//   const handleRadioChange = (e) => {
//     setFormData({
//       ...formData,
//       owner: e.target.value,
//     });
//   };

//   // Handle form submit
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Trigger the callback function with form data
//     onSubmitForm(formData);
//   };

//   return (
//     <div className="user-form-container">
//       <div className="form-wrapper">
//         <h2>To open an account, please fill out the following form</h2>

//         <form onSubmit={handleSubmit}>
//           {/* Business Details */}
//           <div className="form-section">
//             <h3>Business Details*</h3>
//             <div className="form-group">
//               <label htmlFor="companyName">Company Name*</label>
//               <input id="companyName" type="text" placeholder="Enter company name" onChange={handleChange} value={formData.companyName} required />
//             </div>
//             <div className="form-row">
//               <div className="form-group">
//                 <label htmlFor="address">Address*</label>
//                 <input id="address" type="text" placeholder="Enter address" onChange={handleChange} value={formData.address} required />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="city">City*</label>
//                 <input id="city" type="text" placeholder="Enter city" onChange={handleChange} value={formData.city} required />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="province">Province*</label>
//                 <select id="province" onChange={handleChange} value={formData.province} required>
//                   <option value="">Select province</option>
//                   <option value="AB">Alberta</option>
//                   <option value="BC">British Columbia</option>
//                   <option value="MB">Manitoba</option>
//                   <option value="NB">New Brunswick</option>
//                   <option value="NL">Newfoundland and Labrador</option>
//                   <option value="NS">Nova Scotia</option>
//                   <option value="ON">Ontario</option>
//                   <option value="PE">Prince Edward Island</option>
//                   <option value="QC">Quebec</option>
//                   <option value="SK">Saskatchewan</option>
//                   <option value="NT">Northwest Territories</option>
//                   <option value="NU">Nunavut</option>
//                   <option value="YT">Yukon</option>
//                 </select>
//               </div>
//             </div>
//             <div className="form-row">
//               <div className="form-group">
//                 <label htmlFor="postalCode">Postal Code*</label>
//                 <input id="postalCode" type="text" placeholder="Enter postal code" onChange={handleChange} value={formData.postalCode} required />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="phoneNumber">Phone Number*</label>
//                 <input id="phoneNumber" type="tel" placeholder="Enter phone number" pattern="[0-9]{10}" title="Enter a 10-digit phone number" onChange={handleChange} value={formData.phoneNumber} required />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="email">Email*</label>
//                 <input id="email" type="email" placeholder="Enter email" onChange={handleChange} value={formData.email} required />
//               </div>
//             </div>
//           </div>

//           {/* Additional Details */}
//           <div className="form-section">
//             <h3>Additional Details*</h3>
//             <div className="form-group">
//               <label>Are you the company's owner?</label>
//               <div className="radio-group">
//                 <label>
//                   <input type="radio" name="owner" value="yes" onChange={handleRadioChange} required />
//                   Yes
//                 </label>
//                 <label>
//                   <input type="radio" name="owner" value="no" onChange={handleRadioChange} />
//                   No
//                 </label>
//               </div>
//             </div>
//             <div className="form-row">
//               <div className="form-group">
//                 <label htmlFor="firstName">First Name*</label>
//                 <input id="firstName" type="text" placeholder="Enter first name" onChange={handleChange} value={formData.firstName} required />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="lastName">Last Name*</label>
//                 <input id="lastName" type="text" placeholder="Enter last name" onChange={handleChange} value={formData.lastName} required />
//               </div>
//             </div>
//             <div className="form-group">
//               <label htmlFor="operationYear">In operation since</label>
//               <input id="operationYear" type="text" placeholder="Enter year of operation" onChange={handleChange} value={formData.operationYear} />
//             </div>
//             <div className="form-group">
//               <label htmlFor="annualPurchase">Annual purchases planned</label>
//               <input id="annualPurchase" type="text" placeholder="Enter annual purchase plan" onChange={handleChange} value={formData.annualPurchase} />
//             </div>
//             <div className="form-group">
//               <label htmlFor="comments">Comments</label>
//               <textarea id="comments" rows="5" placeholder="Enter any comments" onChange={handleChange} value={formData.comments}></textarea>
//             </div>
//           </div>

//           {/* Submit Button */}
//           <div className="form-group">
//             <button type="submit" className="btn-submit">Submit</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
import "./userform.scss";
import React, { useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from '../../lib/apiRequest';

export default function UserForm() {
  const [error, setError] = useState("");
  const [isLoading,setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading

    const formData = new FormData(e.target); 
    
    const companyName = formData.get('companyName');
    const address = formData.get('address');
    const city = formData.get('city');
    const province = formData.get('province');
    const postalCode = formData.get('postalCode');
    const phoneNumber = formData.get('phoneNumber');
    const email = formData.get('email');
    const password = formData.get('password');
    const owner = formData.get('owner');
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const operationYear = formData.get('operationYear');
    const annualPurchase = formData.get('annualPurchase');
    const comments = formData.get('comments');

    try {

      const res = await apiRequest.post("/auth/register", {
        companyName,
        address,
        city,
        province,
        postalCode,
        phoneNumber,
        email,
        password,
        owner,
        firstName,
        lastName,
        operationYear,
        annualPurchase,
        comments
      });

      navigate("/login");
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
    };
  


  //AAryan's work - commented by Khushbu
  /*const [formData, setFormData] = useState({
    companyName: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
    phoneNumber: '',
    email: '',
    owner: '',
    firstName: '',
    lastName: '',
    operationYear: '',
    annualPurchase: '',
    comments: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('User created:', data);
        // Optionally reset the form or show a success message
        setFormData({
          companyName: '',
          address: '',
          city: '',
          province: '',
          postalCode: '',
          phoneNumber: '',
          email: '',
          owner: '',
          firstName: '',
          lastName: '',
          operationYear: '',
          annualPurchase: '',
          comments: '',
        });
      } else {
        console.error('Failed to create user:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }*/
  

  return (
    <div className="user-form-container">
      <div className="form-wrapper">
        
        <h2>Please fill out the following form to be a member with CWT</h2>
        
        <form onSubmit={handleSubmit}>
         
          {/* Business Details */}
          <div className="form-section">
            <h3>Business Details*</h3>
            <div className="form-group">
              <label htmlFor="company-name">Company Name*</label>
              <input name="companyName" id="company-name" type="text" placeholder="Enter company name" required />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="address">Address*</label>
                <input name="address" id="address" type="text" placeholder="Enter address" required/>
              </div>
              <div className="form-group">
                <label htmlFor="city">City*</label>
                <input name="city" id="city" type="text" placeholder="Enter city" required />
              </div>
              <div className="form-group">
                <label htmlFor="province">Province*</label>
                <select name="province" id="province" required>
                  <option value="">Select province</option>
                  <option value="AB">Alberta</option>
                  <option value="BC">British Columbia</option>
                  <option value="MB">Manitoba</option>
                  <option value="NB">New Brunswick</option>
                  <option value="NL">Newfoundland and Labrador</option>
                  <option value="NS">Nova Scotia</option>
                  <option value="ON">Ontario</option>
                  <option value="PE">Prince Edward Island</option>
                  <option value="QC">Quebec</option>
                  <option value="SK">Saskatchewan</option>
                  <option value="NT">Northwest Territories</option>
                  <option value="NU">Nunavut</option>
                  <option value="YT">Yukon</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="postal-code">Postal Code*</label>
                <input name="postalCode" id="postal-code" type="text" placeholder="Enter postal code" required />
              </div>
              <div className="form-group">
                <label htmlFor="phone-number">Phone no.*</label>
                <input name="phoneNumber" id="phone-number" type="tel" placeholder="Enter phone number" pattern="[0-9]{10}" title="Enter a 10-digit phone number" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Id*</label>
                <input name="email" id="email" type="email" placeholder="Enter email id" required />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password*</label>
                <input name="password" id="password" type="password" placeholder="Generate Your Password" required />
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="form-section">
            <h3>Additional Details*</h3>
            <div className="form-group">
              <label>Are you the company's owner?</label>
              <div className="radio-group">
                <label>
                  <input type="radio" name="owner" value="yes" required />
                  Yes
                </label>
                <label>
                  <input type="radio" name="owner" value="no" />
                  No
                </label>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstname">Firstname*</label>
                <input name="firstName" id="firstname" type="text" placeholder="Enter first name" required />
              </div>
              <div className="form-group">
                <label htmlFor="lastname">Lastname*</label>
                <input name="lastName" id="lastname" type="text" placeholder="Enter last name" required />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="operation-year">In operation since:</label>
              <input name="operationYear" id="operation-year" type="text" placeholder="Enter year of operation" />
            </div>
            <div className="form-group">
              <label htmlFor="annual-purchase">Annual purchased planned:</label>
              <input name="annualPurchase" id="annual-purchase" type="text" placeholder="Enter annual purchase plan" />
            </div>
            <div className="form-group">
              <label htmlFor="comments">Comments:</label>
              <textarea name="comments" id="comments" rows="5" placeholder="Enter any comments" ></textarea>
            </div>
          </div>

          {/* Submit Button */}
          <div className="form-group">
            <button type="submit" className="btn-submit" disabled={isLoading}>Register</button>
            {error && <span>{error}</span>}
          </div>
        </form>
      </div>
    </div>
  );
};