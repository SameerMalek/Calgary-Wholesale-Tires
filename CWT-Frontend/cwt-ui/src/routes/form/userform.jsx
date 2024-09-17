import React from 'react';
import './userform.scss';

export default function UserForm() {
  return (
    <div className="user-form-container">
      <div className="form-wrapper">
        <h2>To open an account please fill out the following form</h2>

        {/* Business Details */}
        <div className="form-section">
          <h3>Business Details*</h3>
          <div className="form-group">
            <label htmlFor="company-name">Company Name*</label>
            <input id="company-name" type="text" placeholder="Enter company name" required />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="address">Address*</label>
              <input id="address" type="text" placeholder="Enter address" required />
            </div>
            <div className="form-group">
              <label htmlFor="city">City*</label>
              <input id="city" type="text" placeholder="Enter city" required />
            </div>
            <div className="form-group">
              <label htmlFor="province">Province*</label>
              <select id="province" required>
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
              <input id="postal-code" type="text" placeholder="Enter postal code" required />
            </div>
            <div className="form-group">
              <label htmlFor="phone-number">Phone no.*</label>
              <input
                id="phone-number"
                type="tel"
                placeholder="Enter phone number"
                pattern="[0-9]{10}"
                title="Enter a 10-digit phone number"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Id*</label>
              <input id="email" type="email" placeholder="Enter email id" required />
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
              <input id="firstname" type="text" placeholder="Enter first name" required />
            </div>
            <div className="form-group">
              <label htmlFor="lastname">Lastname*</label>
              <input id="lastname" type="text" placeholder="Enter last name" required />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="operation-year">In operation since:</label>
            <input id="operation-year" type="text" placeholder="Enter year of operation" />
          </div>
          <div className="form-group">
            <label htmlFor="annual-purchase">Annual purchased planned:</label>
            <input id="annual-purchase" type="text" placeholder="Enter annual purchase plan" />
          </div>
          <div className="form-group">
            <label htmlFor="comments">Comments:</label>
            <textarea id="comments" rows="5" placeholder="Enter any comments"></textarea>
          </div>
        </div>

        {/* Submit Button */}
        <div className="form-group">
          <button type="submit" className="btn-submit">Submit</button>
        </div>
      </div>
    </div>
  );
}
