import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import { FaChevronDown } from "react-icons/fa";
import logo from "../../assets/img/web-logo.png";
import profileImage from "../../assets/M.png";
import "./Header.css";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const logout = () => {
    handleLogout();
    navigate("/"); 
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      <div className="header-left">
        <img src={logo} alt="Logo" className="header-logo" />
        <span className="header-app-name">LostButFound</span>
      </div>

      <div className="header-profile" onClick={toggleDropdown} ref={dropdownRef}>
        <img src={profileImage} alt="Profile" className="profile-image" />
        <span className="username">{localStorage.getItem("username")}</span>
        <FaChevronDown className={`dropdown-icon ${dropdownOpen ? 'open' : ''}`} />

        {dropdownOpen && (
          <div className="dropdown-menu">
            <a href="/profile" className="dropdown-item">My Profile</a>
            <a href="/manage-account" className="dropdown-item">Manage Account</a>
            <a href="/change-password" className="dropdown-item">Change Password</a>
            <a href="/" className="dropdown-item logout-button" onClick={(e) => { e.preventDefault(); logout(); }}>
              Log Out
            </a>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
