import React from "react";
import "./loginModal.scss";

const LoginModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Please log in</h2>
        <p>You need to log in to view product details.</p>
        <div className="modal-actions">
          <button className="login-button" onClick={() => (window.location.href = "/login")}>
            Login
          </button>
          <button className="close-button" onClick={onClose}>
            Continue Browsing
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
