import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/index';
import Report from './pages/Report';
import History from './pages/History';
// import FAQ from './pages/faq'; 
import ItemDetail from './pages/itemDetail';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/report" element={<Report />} />
        <Route path="/history" element={<History />} />
        {/* <Route path="/faq" element={<FAQ />} /> */}
        <Route path="/item/:id" element={<ItemDetail />} />
      </Routes>
  );
}

export default App;
