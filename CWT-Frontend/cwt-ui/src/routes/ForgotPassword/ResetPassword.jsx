import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import apiRequest from '../../lib/apiRequest.js';
import './forgotReset.scss';


function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const token = query.get("token");
  const email = query.get("email");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await apiRequest.post('/auth/reset-password', { email, token, newPassword });
      setMessage(response.data.message, 'Password reset successful!');
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to reset password. Please check the link or try again.");
    }
  };

  return (
    <form onSubmit={handleResetPassword}>
      <h2>Reset Password</h2>
      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="Enter new password"
        required
      />
      <button type="submit">Reset Password</button>
      {message && <p>{message}</p>}
    </form>
  );
}

export default ResetPassword;
