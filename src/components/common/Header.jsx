import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import logo from "../../assets/img/web-logo.png";
import UserProfile from "../../views/UserProfile";
import "./Header.css";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [fullName, setFullName] = useState("User");
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost/LostButFound/php/routes/getUser.php", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setFullName(`${data.user.first_name} ${data.user.last_name}`);
        } else {
          console.error("Failed to fetch user data");
        }
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const logout = () => {
    fetch("http://localhost/LostButFound/php/routes/logout.php", {
      method: "GET",
      credentials: "include",
    })
      .then(() => {
        localStorage.clear();
        navigate("/");
      })
      .catch((error) => console.error("Logout failed:", error));
  };

  const openProfileModal = (e) => {
    e.preventDefault();
    setShowProfileModal(true);
    setDropdownOpen(false);
  };

  const closeProfileModal = () => {
    setShowProfileModal(false);
  };

  return (
    <>
      <header className="header">
        <div className="header-left">
          <img src={logo} alt="Logo" className="header-logo" />
          <span className="header-app-name">LostButFound</span>
        </div>

        <div className="header-profile" onClick={toggleDropdown} ref={dropdownRef}>
          <span className="username">{fullName}</span>
          <FaChevronDown className={`dropdown-icon ${dropdownOpen ? "open" : ""}`} />

          {dropdownOpen && (
            <div className="dropdown-menu">
              <a href="/" className="dropdown-item" onClick={openProfileModal}>
                My Profile
              </a>
              <a href="/" className="dropdown-item logout-button" onClick={(e) => { e.preventDefault(); logout(); }}>
                Log Out
              </a>
            </div>
          )}
        </div>
      </header>

      {showProfileModal && <UserProfile onClose={closeProfileModal} />}
    </>
  );
};

export default Header;
