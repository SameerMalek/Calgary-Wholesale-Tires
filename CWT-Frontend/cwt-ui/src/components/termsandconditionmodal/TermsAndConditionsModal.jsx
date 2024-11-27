import React from 'react';
import TermsAndConditions from '../../routes/termscondition/termscondition';
import './TermsAndConditionsModal.scss'; 

export default function TermsAndConditionsModal({ isOpen, onClose }) {
  if (!isOpen) return null; // Do not render the modal if it's not open

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="terms-content">
          {/* Rendering the existing TermsAndConditions component inside the modal */}
          <TermsAndConditions />
        </div>
        <div className="modal-buttons">
          <button type="button" className="btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
