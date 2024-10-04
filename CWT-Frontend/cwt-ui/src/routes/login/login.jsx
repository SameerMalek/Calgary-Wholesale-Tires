import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './login.scss';
import ForgotPassword from '../../components/forgotpassword/ForgotPassword.jsx';

export default function Login() {
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const navigate = useNavigate(); // Initialize the navigate function

  const openForgotPasswordModal = () => setIsForgotPasswordOpen(true);
  const closeForgotPasswordModal = () => setIsForgotPasswordOpen(false);

  // Function to navigate to UserForm page
  const navigateToCreateAccount = () => {
    navigate("/form"); // This will take the user to the "/create-account" route
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <h2>Sign In</h2>
      </div>
      <div className="login-content">
        <div className="existing-user">
          <h3>Existing Customer</h3>
          <form>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" placeholder="Username" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="Password" />
             </div>
            <button type="submit" className="btn-sign-in">Sign In</button>
            <a href="#" className="forgot-password" onClick={openForgotPasswordModal}>Forgot Password?</a>
          </form>
        </div>
        <div className="new-user">
          <h3>New User</h3>
          <p>Create an account to checkout faster, view order history, and more.</p>
          <button 
            className="btn-create-account" 
            onClick={navigateToCreateAccount} // Add onClick to navigate
          >
            Create Account
          </button>
        </div>
      </div>

      {/* Render the Forgot Password modal */}
      <ForgotPassword isOpen={isForgotPasswordOpen} onClose={closeForgotPasswordModal} />
    </div>
  );
}
