import React, { useState, useEffect, useRef } from "react";
import { FaSearch, FaChevronDown } from "react-icons/fa";
import "./SearchAndFilter.css";

const SearchAndFilter = ({ onSearch, onFilter, categories }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchChange = (e) => {
    onSearch(e.target.value); // Pass the search input value to `Home`
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    onFilter(category);
    setIsDropdownOpen(false);
  };

  return (
    <div className="search-filter-bar">
      <div className="search-bar">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search items..."
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      <div className="filter-dropdown" ref={dropdownRef}>
        <button onClick={toggleDropdown} className="filter-button">
          {selectedCategory || "Filter by Category"} <FaChevronDown />
        </button>
        {isDropdownOpen && (
          <ul className="dropdown-menu">
            <li onClick={() => handleCategorySelect("")}>All Categories</li>
            {categories.map((category, index) => (
              <li key={index} onClick={() => handleCategorySelect(category)}>
                {category}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchAndFilter;
