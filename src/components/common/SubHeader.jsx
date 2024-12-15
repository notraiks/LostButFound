import React from "react";
import { Link } from 'react-router-dom';
import "./SubHeader.css";

const SubHeader = () => {
  return (
    <div className="sub-header">
      <nav className="sub-header-nav">
      <Link to="/home" className="sub-nav-link">Home</Link>
      <Link to="/report" className="sub-nav-link">Report</Link>
      <Link to="/claimrequest" className="sub-nav-link">Claim Request</Link>
      <Link to="/history" className="sub-nav-link">History</Link>
      </nav>
    </div>
  );
};

export default SubHeader;