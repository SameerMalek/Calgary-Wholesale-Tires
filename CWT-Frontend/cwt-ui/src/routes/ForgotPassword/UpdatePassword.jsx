import React, {useState, useContext} from 'react';
import { MdOutlineLockReset } from "react-icons/md";
import { Navigation,useNavigate } from 'react-router-dom';
import apiRequest from '../../lib/apiRequest';
import { AuthContext } from '../../context/AuthContext';

export const UpdatePassword = () => {
    const navigate = useNavigate();
    const {email} = useContext(AuthContext);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const passwordChange = (e) => {
        setPassword(e.target.value);
    }

    const confirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    }

    const submitHandler = async(e) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            console.log('Password do not match!');
            alert("Password do not match!");
            return;
        }

        if(!email){
            setMessage("Email is missing!");
            return;
        }

        try {
            const res = await apiRequest.post("/auth/update-password",
               { email, newPassword: password},
              { headers: { "Content-Type": "application/json" } });
            alert("Password updated successfully!");
            navigate("/login");
        } catch (error) {
            console.log(error);
            alert(error.response.data.message);
        }
    };

  return (
    <div className="forgot-password">
    <center>
    <MdOutlineLockReset />
       <h3>Reset Password</h3>
       <h6 style={{color: 'grey', marginTop: '10px', marginBottom: '10px'}}>Enter new password</h6>
     </center>
     <form onSubmit={submitHandler} >
       <label>Password * </label>
       <input onChange={passwordChange}  value={password} type="password" placeholder="new password" required/>

       <label>Confirm Password * </label>
       <input onChange={confirmPasswordChange} value={confirmPassword} type="password" placeholder="confirm password" required/>

       <div>
       <button type="submit">Update Password</button>
       </div>
 
       <div style={{ margin: '20px 10px', color: 'grey', textDecoration: 'underline', fontSize: '12px' }}>
         
         <a href="/login"> Back to login</a>
       </div>
       {message && <p>{message}</p>}

     </form>
     </div>
  )
}
export default UpdatePassword;