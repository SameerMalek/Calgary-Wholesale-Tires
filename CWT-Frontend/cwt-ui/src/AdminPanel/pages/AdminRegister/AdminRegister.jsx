import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./AdminRegister.scss";

const API_BASE_URL = "http://localhost:8800";

const AdminRegister = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    position: "",
    adminCode: ""
  });

  const [validationErrors, setValidationErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    position: "",
    adminCode: ""
  });

  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [serverStatus, setServerStatus] = useState("unknown");
  const [showAdminCode, setShowAdminCode] = useState(false);

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
      console.error("Server check failed:", {
        error: error.message,
        code: error.code,
        response: error.response
      });
      setServerStatus("offline");
      return false;
    }
  };

  const validateField = (name, value) => {
    switch (name) {
      case "firstName":
        return value.length < 2 ? "First name must be at least 2 characters" : "";
      case "lastName":
        return value.length < 2 ? "Last name must be at least 2 characters" : "";
      case "email":
        return !value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) 
          ? "Please enter a valid email address" 
          : "";
      case "password":
        return value.length < 6 
          ? "Password must be at least 6 characters long" 
          : "";
      case "position":
        return value.length < 2 ? "Position is required" : "";
      case "adminCode":
        return value.length < 1 ? "Admin code is required" : "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));

    // Clear any previous errors
    setValidationErrors(prev => ({
      ...prev,
      [name]: validateField(name, value)
    }));

    console.log(`Field "${name}" updated:`, value);
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

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setError("Please correct the errors in the form");
      return;
    }

    setMessage("");
    setError("");
    setIsLoading(true);

    console.log("Starting registration process...");
    // console.log("Form data to be submitted:", formData);

    try {
      const isServerOnline = await checkServerStatus();
      
      if (!isServerOnline) {
        throw new Error("Server is offline. Please ensure the backend server is running.");
      }

      console.log("Making registration request to:", `${API_BASE_URL}/api/admin/admin-register`);
      
      const response = await axios.post(
        `${API_BASE_URL}/api/admin/admin-register`,
        formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          },
          timeout: 5000
        }
      );

      console.log("Registration successful!", response.data);
      setMessage(response.data.message || "Registration successful!");
      
      // Clear form on success
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        position: "",
        adminCode: ""
      });

      // Redirect after a short delay to show the success message
      setTimeout(() => {
        navigate("/admin/admin-login");
      }, 1500);

    } catch (error) {
      console.error("Registration error:", error);
      
      let errorMessage = "Registration failed: ";
      
      if (error.code === "ECONNABORTED") {
        errorMessage += "Request timed out. Please try again.";
      } else if (error.code === "ERR_NETWORK") {
        errorMessage += "Cannot connect to server. Please ensure the backend is running.";
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
        placeholder={placeholder || name.charAt(0).toUpperCase() + name.slice(1).replace(/([A-Z])/g, ' $1')}
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
    <div className="admin-register">
      <h2>Admin Registration</h2>
      
      {serverStatus === "offline" && (
        <div className="server-status error">
          ⚠️ Backend server appears to be offline. Please ensure it's running on port 8800.
        </div>
      )}

      <form onSubmit={handleRegister}>
        {renderField("firstName")}
        {renderField("lastName")}
        {renderField("email", "email")}
        {renderField("password", "password")}
        {renderField("position")}

        {/*Admin Secret Code Field*/}
        <div className="form-field admin-code-field">
          <input
            type={showAdminCode ? "text" : "password"}
            name="adminCode"
            placeholder="Admin Secret Code"
            value={formData.adminCode}
            onChange={handleChange}
            className={validationErrors.adminCode ? "error" : ""}
            required
          />
          <span
            className="toggle-icon"
            onClick={() => setShowAdminCode((prev) => !prev)}
          >
            {showAdminCode ? <FaEyeSlash /> : <FaEye />}
          </span>
          {validationErrors.adminCode && (
            <span className="error-message">{validationErrors.adminCode}</span>
          )}
        </div>


        <button 
          type="submit" 
          disabled={isLoading || serverStatus === "offline"}
          className={isLoading ? "loading" : ""}
        >
          {isLoading ? "Registering..." : "Register"}
        </button>
      </form>

      {message && <p className="message success">{message}</p>}
      {error && <p className="message error">{error}</p>}
    </div>
  );
};

export default AdminRegister;