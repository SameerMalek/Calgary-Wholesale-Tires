import React from 'react';
import './forgotPassword.scss'; // Import the SCSS for styling

export default function ForgotPassword({ isOpen, onClose }) {
  if (!isOpen) return null; // Do not render the modal if it's not open

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Reset Password</h2>
        <p>
          If an account matches the username entered, an email will be sent to the associated email address with instructions on how to reset your password shortly. If you do not receive an email, please contact customer service.
        </p>
        <form>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" placeholder="Enter Username" />
          </div>
          <div className="modal-buttons">
            <button type="button" className="btn" onClick={onClose}>Return to Sign In</button>
            <button type="submit" className="btn-primary">Send Email</button>
          </div>
        </form>
      </div>
    </div>
  );
}
