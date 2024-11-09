import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import Header from '../components/Header';
import SubHeader from '../components/SubHeader';
import './itemDetail.css';
import './Report.css';
import '../App.css';

function Report() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    locationFound: '',
    dateFound: '',
    timeFound: '',
    description: '',
    username: '',
    yearCourse: '',
    email: '',
    phone: '',
    image: null,
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: URL.createObjectURL(file) });
    }
  };

  const handleRemoveImage = () => {
    setFormData({ ...formData, image: null });
  };

  return (
    <div>
      <Header />
      <SubHeader />
      <div className="main-content">
        <div className="container">
          <div className="content">
            <div className="header-bar">
              <h2>Report Item Form</h2>
            </div>
            <div className="item-detail">
            <div className="insert-image">
              {formData.image ? (
                <>
                  <img src={formData.image} alt="Uploaded preview" />
                  <div className="remove-image-icon" onClick={handleRemoveImage}>
                    <FaTimes />
                  </div>
                </>
              ) : (
                <label className="upload-placeholder">
                  <span>+</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="file-input"
                  />
                </label>
              )}
            </div>
              <div className="item-info">
                <h3>Item Details</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>Item Name</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Category</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="category-dropdown"
                    >
                      <option value="">Select a Category</option>
                      {['Electronics', 'Clothing', 'Books', 'Others'].map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Location Found</label>
                    <input
                      type="text"
                      name="locationFound"
                      value={formData.locationFound}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Date Found</label>
                    <input
                      type="date"
                      name="dateFound"
                      value={formData.dateFound}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Time Found</label>
                    <input
                      type="time"
                      name="timeFound"
                      value={formData.timeFound}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <input
                      type="text"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="form-actions">
              <button className="btn back-button" onClick={() => navigate(-1)}>
                Back
              </button>
              <button className="btn submit-button">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Report;
