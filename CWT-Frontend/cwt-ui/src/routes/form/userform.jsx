import React, { useState } from 'react';
import "./userform.scss";
import { useNavigate } from "react-router-dom";
import apiRequest from '../../lib/apiRequest';

export default function UserForm() {
  const [formData, setFormData] = useState({
    companyName: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
    phoneNumber: '',
    email: '',
    password: '',
    owner: '',
    firstName: '',
    lastName: '',
    operationYear: '',
    annualPurchase: '',
    comments: ''
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.");
      return false;
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phoneNumber)) {
      setError("Please enter a valid 10-digit phone number.");
      return false;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setError("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
  
    if (!validateForm()) {
      return;
    }
  
    setIsLoading(true);
  
    try {
      await apiRequest.post("/auth/register", formData);
      setIsModalOpen(true); // Open the modal on successful registration
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred during registration");
    } finally {
      setIsLoading(false);
    }
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    navigate("/login"); // Redirect to login page after closing the modal
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
              <label htmlFor="companyName">Company Name*</label>
              <input
                name="companyName"
                id="companyName"
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
                <label htmlFor="postalCode">Postal Code*</label>
                <input
                  name="postalCode"
                  id="postalCode"
                  type="text"
                  placeholder="Enter postal code"
                  required
                  onChange={handleChange}
                  value={formData.postalCode}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phoneNumber">Phone no.* (10 digits)</label>
                <input
                  name="phoneNumber"
                  id="phoneNumber"
                  type="tel"
                  placeholder="Enter 10-digit phone number"
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
            <div className="form-group">
              <label htmlFor="password">Password*</label>
              <input
                name="password"
                id="password"
                type="password"
                placeholder="Enter password (min 8 chars, 1 uppercase, 1 lowercase, 1 number)"
                required
                onChange={handleChange}
                value={formData.password}
              />
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
                    checked={formData.owner === "yes"}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="owner"
                    value="no"
                    onChange={handleChange}
                    checked={formData.owner === "no"}
                  />
                  No
                </label>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">Firstname*</label>
                <input
                  name="firstName"
                  id="firstName"
                  type="text"
                  placeholder="Enter first name"
                  required
                  onChange={handleChange}
                  value={formData.firstName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Lastname*</label>
                <input
                  name="lastName"
                  id="lastName"
                  type="text"
                  placeholder="Enter last name"
                  required
                  onChange={handleChange}
                  value={formData.lastName}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="operationYear">In operation since:</label>
              <input
                name="operationYear"
                id="operationYear"
                type="text"
                placeholder="Enter year of operation"
                onChange={handleChange}
                value={formData.operationYear}
              />
            </div>
            <div className="form-group">
              <label htmlFor="annualPurchase">Annual purchased planned:</label>
              <input
                name="annualPurchase"
                id="annualPurchase"
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
            <button type="submit" className="btn-submit" disabled={isLoading}>
              {isLoading ? "Registering..." : "Register"}
            </button>
            {error && <span className="error-message">{error}</span>}
            {success && <span className="success-message">{success}</span>}
          </div>
        </form>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Registration Successful!</h2>
            <p>Your account is pending admin approval. Please wait for the admin to approve your registration.</p>
            <button className="btn-close" onClick={closeModal}>
              OK
            </button>
          </div>
        </div>
      )}
      
    </div>
  );
}

