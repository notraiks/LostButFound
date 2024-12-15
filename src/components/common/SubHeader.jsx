import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./SubHeader.css";

const SubHeader = () => {
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await fetch("http://localhost/LostButFound/php/routes/getUser.php", {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();
        if (data.success) {
          setUserRole(data.user.role);
        } else {
          setUserRole("");
        }
      } catch (err) {
        console.error("Error fetching user role:", err);
      }
    };

    fetchUserRole();
  }, []);

  return (
    <div className="sub-header">
      <nav className="sub-header-nav">
        <Link to="/home" className="sub-nav-link">Home</Link>
        {userRole !== "student" && (
          <>
            <Link to="/report" className="sub-nav-link">Report</Link>
            <Link to="/claimrequest" className="sub-nav-link">Claim Request</Link>
          </>
        )}
        <Link to="/history" className="sub-nav-link">History</Link>
      </nav>
    </div>
  );
};

export default SubHeader;
