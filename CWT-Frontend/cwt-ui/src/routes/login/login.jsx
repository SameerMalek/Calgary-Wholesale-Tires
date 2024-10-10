import React, { useState } from 'react';
import { Link,Navigate,useNavigate } from 'react-router-dom'; // Import useNavigate
import './login.scss';
//import ForgotPassword from '../../components/forgotpassword/ForgotPassword.jsx';
import apiRequest from '../../lib/apiRequest.js';

export default function Login() {

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
  
    const email = e.target.email.value;
    const password = e.target.password.value;
  
    if (!email || !password) {
      setError("Please enter both email and password");
      setIsLoading(false);
      return;
    }
  
    try {
      const res = await apiRequest.post("/auth/login", {
        email,
        password,
      });
  
      console.log("Login response:", res);
  
      if (res.status === 200) {
        // Check if we can access the data
        if (res.data) {
          console.log("Login successful. User data:", res.data);
          localStorage.setItem("user", JSON.stringify(res.data));
          navigate("/");
        } else {
          console.log("Login successful, but unable to access response data.");
          // You might want to handle this case differently
          localStorage.setItem("user", JSON.stringify({ email }));
          navigate("/");
        }
      } else {
        setError("Unexpected response from server");
      }
    } catch (err) {
      console.error("Login error:", err);
      if (err.response) {
        setError(err.response.data?.message || "An error occurred during login.");
      } else if (err.request) {
        setError("No response received from the server. Please try again.");
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  /*const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const navigate = useNavigate(); // Initialize the navigate function

  const openForgotPasswordModal = () => setIsForgotPasswordOpen(true);
  const closeForgotPasswordModal = () => setIsForgotPasswordOpen(false);
*/
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
          <h3>Welcome back</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">EmailId</label>
              <input type="email" id="email" placeholder="email" required  />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="Password" />
             </div>
            <button type="submit" className="btn-sign-in" disabled={isLoading}>Sign In</button>
            {error && <p className="error-message">{error}</p>}
            <a href="#" className="forgot-password">Forgot Password?</a>
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
     
          </div>
  );
}
