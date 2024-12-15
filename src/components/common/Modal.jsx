import React from "react";
import "./Modal.css"; 

const Modal = ({ title, onClose, children }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">{title}</h2>
        <hr className="divider" />
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
