import React, { useEffect, useRef, useState, useContext } from "react";
import { TbPasswordMobilePhone } from "react-icons/tb";
import "./VerifyOtp.scss";
import Timer from "../../components/Timer/Timer";
import {Navigate, useNavigate } from 'react-router-dom';
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";

function VerifyOtp() {
  const {email} = useContext(AuthContext);
  const navigation = useNavigate();
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState('');

  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);
  const ref6 = useRef(null);

  const inputRefs = [ref1, ref2, ref3, ref4, ref5, ref6];

  const [otp1, setOtp1] = useState("");
  const [otp2, setOtp2] = useState(""); 
  const [otp3, setOtp3] = useState("");
  const [otp4, setOtp4] = useState("");
  const [otp5, setOtp5] = useState("");
  const [otp6, setOtp6] = useState("");

  const otpArray = [setOtp1, setOtp2, setOtp3, setOtp4, setOtp5, setOtp6];

  useEffect(() => {
    if(ref1.current) {
      ref1.current.focus();
    } 
  }, []);

  const inputChange = (event, location) => {
    if(location < 5 && event.target.value) {
      inputRefs[location + 1].current.focus();
    }
    otpArray[location](event.target.value);
  }

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const otp = otp1 + otp2 + otp3 + otp4 + otp5 + otp6;
    //console.log("Email is: ", email);
    //console.log("OTP to send: ", otp);

    if(!email){
      setMessage("Email is missing!");
      return;
    }
    try{
      const res = await apiRequest.post("/auth/verify-otp",
         { email, otp},
        { headers: { "Content-Type": "application/json" } }
      );
      setMessage(res.data.message ||"Otp verified successfully!");
      navigation("/update-password");
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred');
    }
  };

  const navigateToUpdatePassword = () => {
    navigation("/update-password");
  }

  

  return (
    <div className="verify-otp">
    <center>
    <TbPasswordMobilePhone />
       <h3>Verify OTP</h3>
       <h6 style={{color: 'grey', marginTop: '10px', marginBottom: '10px'}}>Enter your 6 digit OTP</h6>
     </center>
     <form onSubmit={handleVerifyOtp}> 
      <div>
        <label>OTP *</label>
        <div className="otp-container"> 
          {inputRefs.map((item, index) => {
            return (
            <input required
            onChange={(event) => inputChange(event, index)}
            ref={item}
            onInput={(event) => {
              if (event.target.value.length >1) {
                event.target.value = event.target.value.slice(0, 1);
              }
              }}
              type="tel" pattern="[0-9]{1}" maxLength="1" key={index} className="otp-input" 
              />
             );
          })}
        </div>
      </div> 
      <div>
            <button type="submit" className="btn-sign-in">Verify</button>
      </div>
      <div className="otp-time"><Timer/></div>
       <div className="back-link"> 
         <a href="/login"> Back to login</a>
       </div>
       {message && <p>{message}</p>}

     </form>
     </div>
  );
}

export default VerifyOtp;
