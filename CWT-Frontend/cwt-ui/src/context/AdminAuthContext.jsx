import React, { createContext, useState, useContext } from 'react';
import apiRequest from '../lib/apiRequest';
import { useNavigate } from 'react-router-dom';

// Create the context
const AdminAuthContext = createContext();

// Custom hook for consuming the AdminAuthContext
export const useAdminAuth = () => useContext(AdminAuthContext);

// Provider component
export const AdminAuthProvider = ({ children }) => {
  const [adminAuthData, setAdminAuthData] = useState(null); // State to store admin data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Login function
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiRequest.post('/admin/admin-login', { email, password }, { withCredentials: true });
      setAdminAuthData(response.data);
      localStorage.setItem('adminToken', response.data.token); // Store token in localStorage if using JWT
      navigate('/admin/dashboard'); // Redirect to admin dashboard after login
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    setLoading(true);
    try {
      await apiRequest.post('/admin/admin-logout', {}, { withCredentials: true });
      setAdminAuthData(null); // Clear admin state
      localStorage.removeItem('adminToken'); // Remove token if using JWT
      navigate('/admin/admin-login'); // Redirect to admin login page
    } catch (err) {
      console.error('Logout error:', err);
      setError('Failed to log out');
    } finally {
      setLoading(false);
    }
  };

  // Context value to provide to children
  const value = {
    adminAuthData,
    login,
    logout,
    loading,
    error,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};
