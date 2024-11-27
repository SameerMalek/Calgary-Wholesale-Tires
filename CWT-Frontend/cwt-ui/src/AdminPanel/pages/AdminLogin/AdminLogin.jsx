import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.scss";

const API_BASE_URL = "https://calgary-wholesale-tires.onrender.com";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [validationErrors, setValidationErrors] = useState({
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [serverStatus, setServerStatus] = useState("unknown");
  
  const navigate = useNavigate();

  // Check server status
  useEffect(() => {
    checkServerStatus();
  }, []);

  const checkServerStatus = async () => {
    try {
      console.log("Checking server status...");
      const response = await axios.get(`${API_BASE_URL}/health`, { timeout: 5000 });
      console.log("Server response:", response.data);
      setServerStatus("online");
      return true;
    } catch (error) {
      console.error("Server check failed:", error);
      setServerStatus("offline");
      return false;
    }
  };

  const validateField = (name, value) => {
    switch (name) {
      case "email":
        return !value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
          ? "Please enter a valid email address"
          : "";
      case "password":
        return !value
          ? "Password is required"
          : value.length < 6
          ? "Password must be at least 6 characters"
          : "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear previous validation errors for this field
    setValidationErrors(prev => ({
      ...prev,
      [name]: validateField(name, value)
    }));

    // Clear any previous error messages
    setError("");
    setMessage("");
  };

  const validateForm = () => {
    const errors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) errors[key] = error;
    });

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setError("Please correct the errors in the form");
      return;
    }

    setIsLoading(true);
    setMessage("");
    setError("");

    try {
      const isServerOnline = await checkServerStatus();
      
      if (!isServerOnline) {
        throw new Error("Server is offline. Please try again later.");
      }

      console.log("Attempting login...");
      
      const response = await axios.post(
        `${API_BASE_URL}/api/admin/admin-login`,
        formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          },
          timeout: 5000
        }
      );

      console.log("Login successful!", response.data);
      setMessage("Login successful! Redirecting...");
      
      // Clear form
      setFormData({
        email: "",
        password: ""
      });

      // Redirect after a short delay to show the success message
      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 1500);

    } catch (error) {
      console.error("Login error:", error);
      
      let errorMessage = "Login failed: ";
      
      if (error.code === "ECONNABORTED") {
        errorMessage += "Request timed out. Please try again.";
      } else if (error.code === "ERR_NETWORK") {
        errorMessage += "Cannot connect to server. Please ensure the backend is running.";
      } else if (error.response?.status === 401) {
        errorMessage = "Invalid email or password";
      } else if (error.response?.status === 404) {
        errorMessage += "API endpoint not found. Please verify the correct route.";
      } else {
        errorMessage += error.response?.data?.message || error.message;
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const renderField = (name, type = "text", placeholder) => (
    <div className="form-field">
      <input
        type={type}
        name={name}
        placeholder={placeholder || name.charAt(0).toUpperCase() + name.slice(1)}
        value={formData[name]}
        onChange={handleChange}
        className={validationErrors[name] ? "error" : ""}
        required
      />
      {validationErrors[name] && (
        <span className="error-message">{validationErrors[name]}</span>
      )}
    </div>
  );

  return (
    <div className="admin-login">
      <h2>Admin Login</h2>
      
      {serverStatus === "offline" && (
        <div className="server-status error">
          ⚠️ Backend server appears to be offline. Please ensure it's running on port 8800.
        </div>
      )}

      <form onSubmit={handleLogin}>
        {renderField("email", "email", "Enter your email")}
        {renderField("password", "password", "Enter your password")}

        <button 
          type="submit" 
          disabled={isLoading || serverStatus === "offline"}
          className={isLoading ? "loading" : ""}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>

      {message && <p className="message success">{message}</p>}
      {error && <p className="message error">{error}</p>}
    </div>
  );
};

export default AdminLogin;