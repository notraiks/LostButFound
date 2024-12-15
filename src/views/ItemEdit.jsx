import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../components/common/Modal";

const ItemEdit = ({ item, onClose }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: item.title || "",
    category: item.category || "",
    location_found: item.location_found || "",
    description: item.description || "",
    date_found: item.date_found || "",
    time_found: item.time_found || "",
    item_img: null,
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const categories = [
    "Accessories",
    "Bags & Backpacks",
    "Clothing",
    "Electronics",
    "Eyewear",
    "Footwear",
    "IDs & Cards",
    "Keys",
    "Mobile Devices",
    "Papers & Documents",
    "Tumblers",
    "Wallets & Purses",
    "Others",
  ];

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const formDataToSend = new FormData();
    formDataToSend.append("item_id", item.item_id);
    formDataToSend.append("title", formData.title);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("location_found", formData.location_found);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("date_found", formData.date_found);
    formDataToSend.append("time_found", formData.time_found);
    if (formData.item_img) {
      formDataToSend.append("item_img", formData.item_img);
    }

    try {
      const response = await fetch(
        "http://localhost/LostButFound/php/routes/editItem.php",
        {
          method: "POST",
          credentials: "include",
          body: formDataToSend,
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess("Item updated successfully! Redirecting to home...");
        setTimeout(() => navigate("/home"), 1000);
      } else {
        setError(data.error || "Failed to update item.");
      }
    } catch (err) {
      console.error("Error updating item:", err);
      setError("An error occurred while updating the item.");
    }
  };

  return (
    <Modal title="Edit Item Details" onClose={onClose}>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="item-img">
          <label>Item Image</label>
          <input
            type="file"
            name="item_img"
            accept="image/*"
            onChange={handleInputChange}
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Item Name</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Location Found</label>
            <input
              type="text"
              name="location_found"
              value={formData.location_found}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label>Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Date Found</label>
            <input
              type="date"
              name="date_found"
              value={formData.date_found}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Time Found</label>
            <input
              type="time"
              name="time_found"
              value={formData.time_found}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows="4"
            required
          ></textarea>
        </div>
        <div className="form-actions">
          <button type="submit" className="update-button">
            Update
          </button>
          <button type="button" className="close-button" onClick={onClose}>
            Cancel
          </button>
        </div>
        {success && <p className="success-message">{success}</p>}
        {error && <p className="error-message">{error}</p>}
      </form>
    </Modal>
  );
};

export default ItemEdit;
