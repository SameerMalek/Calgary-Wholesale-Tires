import React, { useState } from 'react';
import "./userform.scss";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function UserForm() {
  // Form data state
  const [formData, setFormData] = useState({
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

  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle input changes for text fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send form data via Axios
      await axios.post("http://localhost:8800/api/auth/register", formData);
      // Navigate to login page after successful registration
      navigate("/login");
    } catch (err) {
      setError(err.response.data.message);
    }
  };

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
              <input
                name="companyName"
                id="company-name"
                type="text"
                placeholder="Enter company name"
                required
                onChange={handleChange}
                value={formData.companyName}
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="address">Address*</label>
                <input
                  name="address"
                  id="address"
                  type="text"
                  placeholder="Enter address"
                  required
                  onChange={handleChange}
                  value={formData.address}
                />
              </div>
              <div className="form-group">
                <label htmlFor="city">City*</label>
                <input
                  name="city"
                  id="city"
                  type="text"
                  placeholder="Enter city"
                  required
                  onChange={handleChange}
                  value={formData.city}
                />
              </div>
              <div className="form-group">
                <label htmlFor="province">Province*</label>
                <select
                  name="province"
                  id="province"
                  required
                  onChange={handleChange}
                  value={formData.province}
                >
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
                <input
                  name="postalCode"
                  id="postal-code"
                  type="text"
                  placeholder="Enter postal code"
                  required
                  onChange={handleChange}
                  value={formData.postalCode}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone-number">Phone no.*</label>
                <input
                  name="phoneNumber"
                  id="phone-number"
                  type="tel"
                  placeholder="Enter phone number"
                  pattern="[0-9]{10}"
                  title="Enter a 10-digit phone number"
                  required
                  onChange={handleChange}
                  value={formData.phoneNumber}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Id*</label>
                <input
                  name="email"
                  id="email"
                  type="email"
                  placeholder="Enter email id"
                  required
                  onChange={handleChange}
                  value={formData.email}
                />
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
                  <input
                    type="radio"
                    name="owner"
                    value="yes"
                    required
                    onChange={handleChange}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="owner"
                    value="no"
                    onChange={handleChange}
                  />
                  No
                </label>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstname">Firstname*</label>
                <input
                  name="firstName"
                  id="firstname"
                  type="text"
                  placeholder="Enter first name"
                  required
                  onChange={handleChange}
                  value={formData.firstName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastname">Lastname*</label>
                <input
                  name="lastName"
                  id="lastname"
                  type="text"
                  placeholder="Enter last name"
                  required
                  onChange={handleChange}
                  value={formData.lastName}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="operation-year">In operation since:</label>
              <input
                name="operationYear"
                id="operation-year"
                type="text"
                placeholder="Enter year of operation"
                onChange={handleChange}
                value={formData.operationYear}
              />
            </div>
            <div className="form-group">
              <label htmlFor="annual-purchase">Annual purchased planned:</label>
              <input
                name="annualPurchase"
                id="annual-purchase"
                type="text"
                placeholder="Enter annual purchase plan"
                onChange={handleChange}
                value={formData.annualPurchase}
              />
            </div>
            <div className="form-group">
              <label htmlFor="comments">Comments:</label>
              <textarea
                name="comments"
                id="comments"
                rows="5"
                placeholder="Enter any comments"
                onChange={handleChange}
                value={formData.comments}
              ></textarea>
            </div>
          </div>

          {/* Submit Button */}
          <div className="form-group">
            <button type="submit" className="btn-submit">Submit</button>
            {error && <span>{error}</span>}
          </div>
        </form>
      </div>
    </div>
  );
}
