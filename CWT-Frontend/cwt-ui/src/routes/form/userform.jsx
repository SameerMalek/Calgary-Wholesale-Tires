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
            <label>Company Name*</label>
            <input type="text" placeholder="Enter company name" />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Address*</label>
              <input type="text" placeholder="Enter address" />
            </div>
            <div className="form-group">
              <label>City*</label>
              <input type="text" placeholder="Enter city" />
            </div>
            <div className="form-group">
              <label>Province*</label>
              <input type="text" placeholder="Enter province" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Postal Code*</label>
              <input type="text" placeholder="Enter postal code" />
            </div>
            <div className="form-group">
              <label>Phone no.*</label>
              <input type="text" placeholder="Enter phone number" />
            </div>
            <div className="form-group">
              <label>Email Id*</label>
              <input type="email" placeholder="Enter email id" />
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
                <input type="radio" name="owner" value="yes" />
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
              <label>Firstname*</label>
              <input type="text" placeholder="Enter first name" />
            </div>
            <div className="form-group">
              <label>Lastname*</label>
              <input type="text" placeholder="Enter last name" />
            </div>
          </div>
          <div className="form-group">
            <label>In operation since:</label>
            <input type="text" placeholder="Enter year of operation" />
          </div>
          <div className="form-group">
            <label>Annual purchased planned:</label>
            <input type="text" placeholder="Enter annual purchase plan" />
          </div>
          <div className="form-group">
            <label>Comments:</label>
            <textarea rows="5" placeholder="Enter any comments"></textarea>
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
