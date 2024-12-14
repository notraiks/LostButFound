import React from "react";
import "./Card.css";

const Card = ({ title, date, time, location, category, badge, item_img, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      <div className="card-image">
        <img 
        src={item_img} 
        alt={title} 
        onError={(e) => { e.target.src = "https://via.placeholder.com/150"; }}
        />
        {badge && badge.toLowerCase() === "claimed" && (
          <span className="badge claimed">Claimed</span>
        )}
      </div>
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p><strong>Date:</strong> {date}</p>
        <p><strong>Time:</strong> {time}</p>
        <p><strong>Location Found:</strong> {location}</p>
        <p><strong>Category:</strong> {category}</p>
      </div>
    </div>
  );
};

export default Card;