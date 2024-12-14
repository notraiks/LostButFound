import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import SubHeader from '../components/common/SubHeader';
import SearchAndFilter from '../components/common/SearchAndFilter';
import Card from '../components/items/Card';
import Pagination from '../components/common/Pagination';
import './Home.css';

function Home() {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost/LostButFound/php/routes/fetch.php', {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setItems(data);
          const uniqueCategories = [...new Set(data.map((item) => item.category))];
          setCategories(uniqueCategories);
        } else {
          console.error('Unexpected data format:', data);
          setItems([]);
          setCategories([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const currentItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleCardClick = (itemId) => {
    navigate(`/item/${itemId}`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Header />
      <SubHeader />
      <div className="main-content">
        <div className="container">
          <div className="content">
            <div className="header-bar">
              <h2>Lost and Found Items</h2>
              <SearchAndFilter onSearch={setSearchQuery} onFilter={setSelectedCategory} categories={categories} />
            </div>
            <div className="card-grid">
              {currentItems.length > 0 ? (
                currentItems.map((item) => (
                  <Card
                    key={item.item_id}
                    title={item.title}
                    date={item.date_found}
                    time={item.time_found}
                    location={item.location_found}
                    category={item.category}
                    badge={item.status}
                    item_img={item.item_img}
                    onClick={() => handleCardClick(item.item_id)}
                  />
                ))
              ) : (
                <p>No items found. Try adjusting your search criteria.</p>
              )}
            </div>
            {totalPages > 1 && (
              <Pagination currentPage={currentPage} totalPages={totalPages} totalItems={filteredItems.length} onPageChange={handlePageChange} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
