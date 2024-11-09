import React, { useState, useContext } from 'react';
import './forgotReset.scss';
import apiRequest from '../../lib/apiRequest';
import { PiMicrosoftOutlookLogoFill } from "react-icons/pi";
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function ForgotPassword() {
  const [inputEmail, setInputEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const {setEmail} = useContext(AuthContext);
  const navigate = useNavigate();
  
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setEmail(inputEmail);
    console.log(inputEmail);
    //setLoading(true);
    //setMessage('');
    try {
      const response = await apiRequest.post('/auth/forgot-password', { email: inputEmail });
      setMessage("Password reset email sent! Please check your inbox.",response.data.message);
      navigate("/verify-otp");
    } catch (error) {
      console.log(error);
      setMessage(error.response?.data?.message || 'An error occurred');
    }
    
  };
  const NavigateToOtp = () => {
    navigate("/verify-otp");
  };

  return (
   
   <div className="forgot-password">
   <center>
   <PiMicrosoftOutlookLogoFill />

      <h2>Forgot Password</h2>
      <h6 style={{color: 'grey', marginTop: '10px', marginBottom: '10px'}}>Enter your registered email to reset your password</h6>
    </center>
    <form onSubmit={handleForgotPassword}>
      
      <input
        type="email"
        onChange={(e) => setInputEmail(e.target.value)}
        value={inputEmail}
        placeholder="Enter your email"
        required
      />
      <div>
      <button type="submit">Send OTP</button>
      </div>

      <div style={{ margin: '20px 10px', color: 'grey', textDecoration: 'underline', fontSize: '12px' }}>
        
        <a href="/login"> Back to login</a>
      </div>
      {loading && <p>Loading...</p>}
      {message && <p>{message}</p>}
    </form>
    </div>
  );
}

export default ForgotPassword;
