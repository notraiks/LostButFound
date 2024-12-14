import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../AuthContext";
import "./UserProfile.css";

const UserProfile = () => {
  const { isLoggedIn } = useContext(AuthContext);
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
  const [showModal, setShowModal] = useState(true);

  // Fetch user data when the component mounts
  useEffect(() => {
    if (isLoggedIn) {
      fetch(`http://localhost/LostButFound/php/routes/getUser.php?user_id=${localStorage.getItem("authToken")}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data); // Debugging line to check the API response
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
    }
  }, [isLoggedIn]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (userData.newPassword && userData.newPassword !== userData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Send a POST request to update user data
    fetch("http://localhost/LostButFound/php/routes/updateUser.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...userData, user_id: localStorage.getItem("authToken") }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setSuccess("Profile updated successfully.");
          // Update localStorage with the new name
          localStorage.setItem("first_name", userData.firstName);
          localStorage.setItem("last_name", userData.lastName);
        } else {
          setError(data.error || "Failed to update profile.");
        }
      })
      .catch(() => setError("An error occurred while updating profile."));
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2 className="modal-title">User Profile</h2>
            <form onSubmit={handleUpdate} className="modal-form">
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
                <a href="/" className="close-button" onClick={(e) => { e.preventDefault(); closeModal(); }}>Close</a>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfile;
