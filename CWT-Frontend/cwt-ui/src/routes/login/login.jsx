// import React, { useContext, useState } from 'react';
// import { Link, Navigate, useNavigate } from 'react-router-dom'; // Import useNavigate
// import apiRequest from '../../lib/apiRequest.js';
// import { AuthContext } from '../../context/AuthContext';
// import './Login.scss';

// export default function Login() {
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false); 
//   const {updateUser} = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError("");
//     setSuccess(false);
  
//     const email = e.target.email.value.trim();
//     const password = e.target.password.value;
  
//     // Basic email and password validations
//     if (!email || !password) {
//       setError("Please enter both email and password");
//       setIsLoading(false);
//       return;
//     }
//     if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/i.test(email)) {
//       setError("Please enter a valid email address.");
//       setIsLoading(false);
//       return;
//     }
//     if (password.length < 8) {
//       setError("Password must be at least 8 characters.");
//       setIsLoading(false);
//       return;
//     }
  
//     try {
//       const res = await apiRequest.post("/auth/login", {
//         email,
//         password,
//       }, { withCredentials: true});
      
//       console.log("Login response:", res.data);
//       updateUser(res.data);
//       navigate("/");
//     } 
//     catch (err) {
//       console.error("Login error:", err);
//       setError("Login failed. Please check your email and password.", err.response.data.message);
//     } 
//     finally {
//       setIsLoading(false);
//     }
//   };
  

//   // Function to navigate to UserForm page
//   const navigateToCreateAccount = () => {
//     navigate("/form"); // This will take the user to the "/create-account" route
//   };

//   // Function to navigate to ForgotPassword page
//   const navigateToForgotPassword = () => {
//     navigate("/forgot-password"); // This will take the user to the "/forgot-password" route
//   };

//   return (
//     <div className="login-container">
//       <div className="login-header">
//         <h2>Sign In</h2>
//       </div>
//       <div className="login-content">
//         <div className="existing-user">
//           <h3>Welcome back</h3>
//           <p>Enter your email and password to access your account.</p>
//           <form onSubmit={handleSubmit}>
//             <div className="form-group">
//               <label htmlFor="email">Email:</label>
//               <input type="email" id="email" name='email'  required  />
//             </div>
//             <div className="form-group">
//               <label htmlFor="password" placeholder="Enter your password">Password</label>
//               <input type={showPassword ? "text" : "password"}
//             id="password"
//             name="password"
//             required />
//             </div>
            
//              <label>
//             <input
//               type="checkbox"
//               checked={showPassword}
//               onChange={() => setShowPassword(!showPassword)}
//             />
//             Show Password
//           </label>
//           <div className='btn-container'>
//             <button type="submit" className="btn-sign-in" disabled={isLoading}>
//             {isLoading ? "Logging in..." : "Login"}</button>
//             {error && <p className="error-message">{error}</p>}
//             <span className='forgot-password' onClick={navigateToForgotPassword}></span>
//             </div>  
//           </form>
//         </div>
//         <div className="new-user">
//           <h3>New User</h3>
//           <p>Create an account to checkout faster, view order history, and more.</p>
//           <button 
//             className="btn-create-account" 
//             onClick={navigateToCreateAccount} // Add onClick to navigate
//           >
//             Create Account
//           </button>
//         </div>
//       </div>
     
//     </div>
//   );
// }


// import React, { useContext, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import apiRequest from '../../lib/apiRequest.js';
// import { AuthContext } from '../../context/AuthContext';
// import './Login.scss';

// export default function Login() {
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const { updateUser } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError("");

//     const email = e.target.email.value.trim();
//     const password = e.target.password.value;

//     // Basic validations
//     if (!email || !password) {
//       setError("Please enter both email and password.");
//       setIsLoading(false);
//       return;
//     }

//     try {
//       const res = await apiRequest.post(
//         "/auth/login",
//         { email, password },
//         { withCredentials: true }
//       );

//       if (res.data.isApproved) {
//         // Update the user in context if approved and navigate to the home page
//         updateUser(res.data);
//         navigate("/");
//       } else {
//         // Show error message if user is not approved
//         setError("Your account is pending admin approval. Please wait for approval.");
//       }
//     } catch (err) {
//       setError("Login failed. Please check your email and password.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const navigateToCreateAccount = () => {
//     navigate("/form");
//   };

//   const navigateToForgotPassword = () => {
//     navigate("/forgot-password");
//   };

//   return (
//     <div className="login-container">
//       <div className="login-header">
//         <h2>Sign In</h2>
//       </div>
//       <div className="login-content">
//         <div className="existing-user">
//           <h3>Welcome back</h3>
//           <p>Enter your email and password to access your account.</p>
//           <form onSubmit={handleSubmit}>
//             <div className="form-group">
//               <label htmlFor="email">Email:</label>
//               <input type="email" id="email" name="email" required />
//             </div>
//             <div className="form-group">
//               <label htmlFor="password">Password</label>
//               <input
//                 type={showPassword ? "text" : "password"}
//                 id="password"
//                 name="password"
//                 required
//               />
//             </div>

//             <label>
//               <input
//                 type="checkbox"
//                 checked={showPassword}
//                 onChange={() => setShowPassword(!showPassword)}
//               />
//               Show Password
//             </label>
//             <div className="btn-container">
//               <button type="submit" className="btn-sign-in" disabled={isLoading}>
//                 {isLoading ? "Logging in..." : "Login"}
//               </button>
//               {error && <p className="error-message">{error}</p>}
//               <span className="forgot-password" onClick={navigateToForgotPassword}>
//                 Forgot password?
//               </span>
//             </div>
//           </form>
//         </div>
//         <div className="new-user">
//           <h3>New User</h3>
//           <p>Create an account to checkout faster, view order history, and more.</p>
//           <button
//             className="btn-create-account"
//             onClick={navigateToCreateAccount}
//           >
//             Create Account
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiRequest from '../../lib/apiRequest.js';
import { AuthContext } from '../../context/AuthContext';
import './Login.scss';

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
  
      // Check if the account is approved
      if (!res.data.isApproved) {
        setError("Your account is pending admin approval.");
      } else {
        // Update the user in context if approved and navigate to the home page
        updateUser(res.data);
        navigate("/");
      }
    } catch (err) {
      // Determine the error based on server response
      if (err.response) {
        if (err.response.status === 400 && err.response.data.message === "Invalid Password!") {
          setError("Incorrect password. Please try again.");
        } else if (err.response.status === 400 && err.response.data.message === "Invalid Email!") {
          setError("No account found with that email. Please try again.");
        } else if (err.response.status === 403 && err.response.data.message === "Your account is pending admin approval.") {
          setError("Your account is pending admin approval.");
        } else {
          setError("Login failed. Please check your email and password.");
        }
      } else {
        setError("An unexpected error occurred. Please try again later.");
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
          <h3>Welcome back</h3>
          <p>Enter your email and password to access your account.</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                required
              />
            </div>

            <label>
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              Show Password
            </label>
            <div className="btn-container">
              <button type="submit" className="btn-sign-in" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </button>
              {error && <p className="error-message">{error}</p>}
              <span className="forgot-password" onClick={navigateToForgotPassword}>
                Forgot password?
              </span>
            </div>
          </form>
        </div>
        <div className="new-user">
          <h3>New User</h3>
          <p>Create an account to checkout faster, view order history, and more.</p>
          <button
            className="btn-create-account"
            onClick={navigateToCreateAccount}
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}
