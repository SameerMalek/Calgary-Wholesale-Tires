import React from 'react';
import './login.scss';

export default function Login() {
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
            <a href="#" className="forgot-password">Forgot Password?</a>
          </form>
        </div>
        <div className="new-user">
          <h3>New User</h3>
          <p>Create an account to checkout faster, view order history, and more.</p>
          <button className="btn-create-account">Create Account</button>
        </div>
      </div>
    </div>
  );
}
