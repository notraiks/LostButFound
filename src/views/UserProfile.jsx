import React, { useState, useEffect } from "react";
import Modal from "../components/common/Modal"; 
import "../components/common/Modal.css";

const UserProfile = ({ onClose }) => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    yrCourse: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch user data when the component mounts
  useEffect(() => {
    fetch("http://localhost/LostButFound/php/routes/getUser.php", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setUserData({
            firstName: data.user.first_name || "",
            lastName: data.user.last_name || "",
            email: data.user.email || "",
            phoneNumber: data.user.phone_number || "",
            yrCourse: data.user.yr_course || "",
            newPassword: "",
            confirmPassword: "",
          });
        } else {
          setError(data.error || "Failed to fetch user data.");
        }
      })
      .catch(() => setError("An error occurred while fetching user data."));
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // Handle form submission
  const handleUpdate = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (userData.newPassword && userData.newPassword !== userData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const userId = localStorage.getItem("user_id");

    if (!userId) {
      setError("User ID is missing. Please log in again.");
      return;
    }

    fetch("http://localhost/LostButFound/php/routes/updateUser.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        ...userData,
        user_id: userId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setSuccess("Profile updated successfully.");
          localStorage.setItem("first_name", userData.firstName);
          localStorage.setItem("last_name", userData.lastName);
        } else {
          setError(data.error || "Failed to update profile.");
        }
      })
      .catch(() => setError("An error occurred while updating profile."));
  };

  return (
    <Modal title="User Profile" onClose={onClose}>
      <form onSubmit={handleUpdate} className="modal-form">
        <div className="form-row">
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={userData.firstName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={userData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={userData.phoneNumber}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Year and Course</label>
          <input
            type="text"
            name="yrCourse"
            value={userData.yrCourse}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>New Password</label>
          <input
            type="password"
            name="newPassword"
            value={userData.newPassword}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={userData.confirmPassword}
            onChange={handleInputChange}
          />
        </div>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <div className="form-actions">
          <button type="submit" className="update-button">Update</button>
          <button type="button" className="close-button" onClick={onClose}>Close</button>
        </div>
      </form>
    </Modal>
  );
};

export default UserProfile;
