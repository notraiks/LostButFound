import React from "react";
import { Link } from 'react-router-dom';
import "./SubHeader.css";

const SubHeader = () => {
  return (
    <div className="sub-header">
      <nav className="sub-header-nav">
      <Link to="/" className="sub-nav-link">Home</Link>
      <Link to="/report" className="sub-nav-link">Report</Link>
      <Link to="/history" className="sub-nav-link">History</Link>
      <Link to="/login" className="sub-nav-link">FAQ</Link>
      </nav>
    </div>
  );
};

export default SubHeader;