// import React from 'react';
// import TermsAndConditions from '../../routes/termscondition/termscondition';
// import './TermsAndConditionsModal.scss'; 

// export default function TermsAndConditionsModal({ isOpen, onClose }) {
//   if (!isOpen) return null; // Do not render the modal if it's not open

//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <div className="terms-content">
//           {/* Rendering the existing TermsAndConditions component inside the modal */}
//           <TermsAndConditions />
//         </div>
//         <div className="modal-buttons">
//           <button type="button" className="btn" onClick={onClose}>
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import React from "react";
import "./TermsAndConditionsModal.scss";

const TermsAndConditionsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="terms-modal-overlay">
      <div className="terms-modal">
        <div className="modal-header">
          <h2>Terms and Conditions</h2>
          <button className="close-modal" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-content">
          <h3>Welcome to Our Terms and Conditions</h3>
          <p>
            By using our services, you agree to be bound by these terms. Please
            read them carefully.
          </p>
          <p>
            <strong>Privacy Policy:</strong> We are committed to protecting your
            privacy. For more details, visit our Privacy Policy page.
          </p>
          <h3>Key Policies:</h3>
          <ul>
            <li>All purchases are final.</li>
            <li>Return policies are limited to specific conditions.</li>
            <li>Payment disputes must be reported within 15 days.</li>
          </ul>
          <p>
            If you have questions about our terms, feel free to contact our
            support team.
          </p>
        </div>
        <div className="modal-footer">
          <button className="accept-button" onClick={onClose}>
            I Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionsModal;
