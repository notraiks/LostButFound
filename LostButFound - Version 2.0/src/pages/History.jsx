import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import SubHeader from '../components/SubHeader';
import './itemDetail.css';
import './Report.css';
import '../App.css';

function History() {


  return (
    <div>
      <Header />
      <SubHeader />
      <div className="main-content">
        <div className="container">
          <div className="content">
            <div className="header-bar">
              <h2>History Logs</h2>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default History;
