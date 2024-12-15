import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/common/Header";
import SubHeader from "../components/common/SubHeader";
import "../App.css";
import "./itemDetail.css";

const ItemDetailsV2 = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    // Fetch claimed item details
    fetch(`http://localhost/LostButFound/php/routes/claimedItemDetail.php?id=${id}`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setItem(data);
        }
      })
      .catch((error) => setError("Error fetching claimed item data: " + error.message));
  }, [id]);

  const handleDelete = async () => {
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        "http://localhost/LostButFound/php/routes/deleteClaimed.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ item_id: id }),
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess("Claimed item deleted. Redirecting to home...");
        setTimeout(() => navigate("/home"), 1000);
      } else {
        setError(data.error || "Failed to delete claimed item.");
      }
    } catch (err) {
      setError("An error occurred while deleting the claimed item.");
    }
  };

  return (
    <div>
      <Header />
      <SubHeader />
      {item ? (
        <div className="main-content">
          <div className="container">
            <div className="content">
              <div className="header-bar">
                <h2>Claimed Item Details</h2>
              </div>
              <div className="item-detail">
                <div className="item-image">
                  <img
                    src={`http://localhost/LostButFound/${item.item_img}`}
                    alt={item.title}
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/150";
                    }}
                  />
                </div>
                <div className="item-info">
                  <h3>Item Details</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Item Name</label>
                      <input type="text" value={item.title} readOnly />
                    </div>
                    <div className="form-group">
                      <label>Category</label>
                      <input type="text" value={item.category} readOnly />
                    </div>
                    <div className="form-group">
                      <label>Location Found</label>
                      <input type="text" value={item.location_found} readOnly />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Date Found</label>
                      <input type="text" value={item.date_found} readOnly />
                    </div>
                    <div className="form-group">
                      <label>Time Found</label>
                      <input type="text" value={item.time_found} readOnly />
                    </div>
                    <div className="form-group">
                      <label>Description</label>
                      <input type="text" value={item.description} readOnly />
                    </div>
                  </div>
                  <h3>Claimer Details</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Claimed By</label>
                      <input
                        type="text"
                        value={`${item.claimer_first_name} ${item.claimer_last_name}`}
                        readOnly
                      />
                    </div>
                    <div className="form-group">
                      <label>Year and Course</label>
                      <input type="text" value={item.claimer_yr_course || "N/A"} readOnly />
                    </div>
                    <div className="form-group">
                      <label>Email Address</label>
                      <input type="text" value={item.claimer_email || "N/A"} readOnly />
                    </div>
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input type="text" value={item.claimer_phone_number || "N/A"} readOnly />
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-actions">
                <button className="btn back-button" onClick={() => navigate(-1)}>
                  Back
                </button>
                <button className="btn delete-button" onClick={handleDelete}>
                  Delete
                </button>
              </div>
              {success && <p className="success-message">{success}</p>}
              {error && <p className="error-message">{error}</p>}
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ItemDetailsV2;
