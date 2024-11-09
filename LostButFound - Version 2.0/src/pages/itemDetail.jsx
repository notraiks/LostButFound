import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from '../components/Header';
import SubHeader from '../components/SubHeader';
import '../App.css';
import './itemDetail.css';

const ItemDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);

  useEffect(() => {
    fetch(`http://localhost/LostButFound/php/fetch.php?id=${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          console.error("Error fetching item data:", data.error);
        } else {
          setItem(data);
        }
      })
      .catch((error) => console.error("Error fetching item data:", error));
  }, [id]);

  return (
    <div>
      <Header />
      <SubHeader />
      {item && (
        <div className="main-content">
          <div className="container">
            <div className="content">
              <div className="header-bar">
                <h2>Item Information</h2>
              </div>
              <div className="item-detail">
                <div className="item-image">
                <img
                    src={`http://localhost/LostButFound/${item.item_img}`}
                    alt={item.title}
                    onError={(e) => { e.target.src = "https://via.placeholder.com/150"; }}
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
                  <h3>Turnover Details</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Turned over by</label>
                      <input type="text" value={item.username} readOnly />
                    </div>
                    <div className="form-group">
                      <label>Year and Course</label>
                      <input type="text" value="BSID 3" readOnly />
                    </div>
                    <div className="form-group">
                      <label>Email Address</label>
                      <input type="text" value={item.email} readOnly />
                    </div>
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input type="text" value="09847548652" readOnly />
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-actions">
                <button className="btn back-button" onClick={() => navigate(-1)}>Back</button>
                <button className="btn claim-button">Claim</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemDetailPage;
