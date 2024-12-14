import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import Home from './views/Home';
import Report from './views/Report';
import History from './views/History';
import Login from './views/Login';
import CreateAccount from './views/CreateAccount';
import ItemDetail from './views/ItemDetail';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <Login />} />
      <Route path="/create-account" element={<CreateAccount />} />

      <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
        <Route path="/home" element={<Home />} />
        <Route path="/report" element={<Report />} />
        <Route path="/history" element={<History />} />
        <Route path="/item/:id" element={<ItemDetail />} />
      </Route>

      {/* Fallback route for unmatched paths */}
      <Route path="*" element={<Navigate to={isLoggedIn ? "/home" : "/"} />} />
    </Routes>
  );
}

export default App;
