import React from 'react';
import './modal2.scss';

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal2-overlay" onClick={onClose}>
            <div className="modal2-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal2-close" onClick={onClose}>
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
