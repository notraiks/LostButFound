import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import SubHeader from '../components/common/SubHeader';
import './Pending.css'; // Import Pending.css

function Pending() {
  const navigate = useNavigate();
  const [pendingItems, setPendingItems] = useState([]);

  useEffect(() => {
    const fetchPendingItems = async () => {
      try {
        const response = await fetch('http://localhost/LostButFound/php/routes/fetchPending.php', {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setPendingItems(data);
      } catch (error) {
        console.error('Error fetching pending items:', error);
      }
    };

    fetchPendingItems();
  }, []);

  return (
    <div>
      <Header />
      <SubHeader />
      <div className="main-content">
        <div className="container">
          <div className="content">
            <div className="header-bar">
              <h2>Pending Items</h2>
            </div>
            <div className="pending-container">
              {pendingItems.length > 0 ? (
                <ul>
                  {pendingItems.map((item) => (
                    <li key={item.item_id} onClick={() => navigate(`/item/${item.item_id}`)}>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No pending items found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pending;