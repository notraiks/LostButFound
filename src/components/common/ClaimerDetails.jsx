import React, { useState } from "react";
import "./UserProfile.css";

const ClaimerDetails = ({ claimer, requestId, itemId, onClose }) => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleApprove = async () => {
    try {
      const response = await fetch("http://localhost/LostButFound/php/routes/approveRequest.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          request_id: requestId,
          item_id: itemId,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setSuccessMessage("Request approved successfully!");
      setTimeout(onClose, 2000);
    } catch (error) {
      setErrorMessage("An error occurred while approving the request.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2 className="modal-title">Claimer Details</h2>
        <div className="modal-form">
          <div className="form-row">
            <div className="form-group">
              <label>First Name</label>
              <input type="text" value={claimer.firstName} readOnly />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input type="text" value={claimer.lastName} readOnly />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Email</label>
              <input type="email" value={claimer.email} readOnly />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input type="text" value={claimer.phoneNumber || "N/A"} readOnly />
            </div>
          </div>
          <div className="form-group">
            <label>Year and Course</label>
            <input type="text" value={claimer.yrCourse || "N/A"} readOnly />
          </div>
          {successMessage && <p className="success-message">{successMessage}</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="form-actions">
            <button className="update-button" onClick={handleApprove}>
              Approve
            </button>
            <button className="close-button" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClaimerDetails;
