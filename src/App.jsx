import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './views/Home';
import Report from './views/Report';
import History from './views/History';
import Login from './views/Login';
import CreateAccount from './views/CreateAccount';
import ItemDetail from './views/itemDetail';
import ClaimRequest from './views/ClaimRequest';
import ItemDetailsv2 from './views/itemDetailsv2';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('http://localhost/LostButFound/php/routes/getUser.php', {
          method: 'GET',
          credentials: 'include',
        });

        const data = await response.json();

        setIsLoggedIn(data.success);
      } catch (error) {
        console.error('Session check failed:', error);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);


  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/create-account" element={<CreateAccount />} />


        <Route path="/home" element={<Home />} />
        <Route path="/report" element={<Report />} />
        <Route path="/claimrequest" element={<ClaimRequest />} />
        <Route path="/history" element={<History />} />
        <Route path="/itemDetailsv2/:id" element={<ItemDetailsv2 />} />
        <Route path="/item/:id" element={<ItemDetail />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
