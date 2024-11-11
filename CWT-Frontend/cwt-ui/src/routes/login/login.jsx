import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiRequest from '../../lib/apiRequest.js';
import { AuthContext } from '../../context/AuthContext';
import { IoLogInSharp } from "react-icons/io5";
import { MdOutlineAppRegistration } from "react-icons/md";
import './Login.scss';
import { Link } from 'react-router-dom';



export default function Login() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const email = e.target.email.value.trim();
    const password = e.target.password.value;

    // Basic validations
    if (!email || !password) {
      setError("Please enter both email and password.");
      setIsLoading(false);
      return;
    }

    try {
      const res = await apiRequest.post(
        "/auth/login",
        { email, password },
        { withCredentials: true }
      );
      console.log("Response Data:", res.data); 

      // Check if the account is approved
      if (!res.data.isApproved) {
        setError("Your account is pending admin approval.");
      } else {
        // Update the user in context if approved and navigate to the home page
        updateUser(res.data); // Use userInfo to populate AuthContext
        navigate("/");
      }
    } catch (err) {
      // Check specific error messages for incorrect password and unapproved accounts
      if (err.response) {
        if (err.response.status === 400 && err.response.data.message === "Invalid Password!") {
          setError("Incorrect password. Please try again.");
        } else if (err.response.status === 403 && err.response.data.message === "Your account is pending admin approval.") {
          setError("Your account is pending admin approval.");
        } else {
          setError("Login failed. Please check your email and password.");
        }
      } else {
        setError("Login failed. Please check your email and password.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToCreateAccount = () => {
    navigate("/form");
  };

  const navigateToForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <h2>Sign In</h2>
      </div>
      <div className="login-content">
        <div className="existing-user">
        <center><IoLogInSharp className='svg' />
          <h3>Welcome back</h3>
          <p>Enter your email and password to access your account.</p>
          </center>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input type="email" id="email" name='email'  required placeholder='enter your emailid' />
            </div>
            <div className="form-group">
              <label htmlFor="password" >Password *</label>
              <input type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            placeholder='enter your password'
            required />
            </div>
            <div className=''>
             <label>
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            Show Password
          </label>
          </div>
          <div className='btn-container'>
            <button type="submit" className="btn-sign-in" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}</button>
            </div> 
            <div style={{ marginTop: "10px", color: "grey", textAlign: "right", textDecoration: "underline" }}>
                <Link to="/forgot-password">Forgot Password?</Link>
          </div>   
            {error && <p className="error-message">{error}</p>}
          </form>
          
        </div>
        <div className="new-user">
       <center> 
        <MdOutlineAppRegistration />

          <h3>New User</h3>
          <p>Create an account to checkout faster, view order history, and more.</p>
          </center>
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
